"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  Save,
  Image as ImageIcon,
  Music,
  Mail,
  Heart,
  Palette,
  Type,
} from "lucide-react";
import type { SiteConfig } from "@/types/site-config";

const inputClass =
  "w-full rounded-sm border border-[#e0d8cc] bg-white px-3 py-2 text-sm text-[#2c2c2c] outline-none focus:border-[#8b9d83]";
const labelClass = "mb-1 block text-xs uppercase tracking-[0.1em] text-[#8b9d83]";

export function AdminCustomize() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const [settingsRes, imagesRes] = await Promise.all([
      fetch("/api/admin/settings"),
      fetch("/api/admin/images"),
    ]);
    if (settingsRes.ok) setConfig(await settingsRes.json());
    if (imagesRes.ok) {
      const data = await imagesRes.json();
      setImages(data.images ?? []);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!config) return;
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });

    if (res.ok) {
      setMessage("¡Cambios guardados! Los visitantes verán las actualizaciones.");
    } else {
      setMessage("Error al guardar. Intenta de nuevo.");
    }
    setSaving(false);
  }

  if (!config) {
    return <p className="text-[#5c5348]">Cargando configuración...</p>;
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Pareja */}
      <section className="rounded-sm border border-[#e0d8cc] bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-xl text-[#2c2c2c]">
          <Heart className="h-5 w-5 text-[#8b9d83]" />
          Información de la pareja
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Nombre novia</label>
            <input
              className={inputClass}
              value={config.couple.bride}
              onChange={(e) =>
                setConfig({
                  ...config,
                  couple: {
                    ...config.couple,
                    bride: e.target.value,
                    display: `${e.target.value} & ${config.couple.groom}`,
                  },
                })
              }
            />
          </div>
          <div>
            <label className={labelClass}>Nombre novio</label>
            <input
              className={inputClass}
              value={config.couple.groom}
              onChange={(e) =>
                setConfig({
                  ...config,
                  couple: {
                    ...config.couple,
                    groom: e.target.value,
                    display: `${config.couple.bride} & ${e.target.value}`,
                  },
                })
              }
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Mensaje de bienvenida</label>
            <textarea
              className={inputClass}
              rows={2}
              value={config.welcomeMessage}
              onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Fecha (texto)</label>
            <input
              className={inputClass}
              value={config.dateDisplay}
              onChange={(e) => setConfig({ ...config, dateDisplay: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Fecha (ISO para cuenta regresiva)</label>
            <input
              className={inputClass}
              value={config.date}
              onChange={(e) => setConfig({ ...config, date: e.target.value })}
            />
          </div>
        </div>
      </section>

      {/* Imágenes */}
      <section className="rounded-sm border border-[#e0d8cc] bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-xl text-[#2c2c2c]">
          <ImageIcon className="h-5 w-5 text-[#8b9d83]" />
          Imágenes
        </h2>
        <p className="mb-4 text-sm text-[#5c5348]">
          Selecciona la foto principal y las imágenes de la galería.
        </p>

        <label className={labelClass}>Foto principal (Hero)</label>
        <div className="mb-6 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {images.map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => setConfig({ ...config, heroImage: src })}
              className={`relative aspect-square overflow-hidden rounded-sm border-2 transition-all ${
                config.heroImage === src
                  ? "border-[#8b9d83] ring-2 ring-[#8b9d83]/30"
                  : "border-transparent hover:border-[#e0d8cc]"
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="100px" />
            </button>
          ))}
        </div>

        <label className={labelClass}>Galería (clic para incluir/excluir)</label>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {images.map((src) => {
            const inGallery = config.galleryImages.some((g) => g.src === src);
            return (
              <button
                key={`gal-${src}`}
                type="button"
                onClick={() => {
                  if (inGallery) {
                    setConfig({
                      ...config,
                      galleryImages: config.galleryImages.filter((g) => g.src !== src),
                    });
                  } else {
                    setConfig({
                      ...config,
                      galleryImages: [
                        ...config.galleryImages,
                        {
                          id: config.galleryImages.length + 1,
                          src,
                          alt: `${config.couple.display}`,
                        },
                      ],
                    });
                  }
                }}
                className={`relative aspect-square overflow-hidden rounded-sm border-2 transition-all ${
                  inGallery
                    ? "border-[#8b9d83] ring-2 ring-[#8b9d83]/30"
                    : "border-transparent opacity-50 hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="100px" />
              </button>
            );
          })}
        </div>
      </section>

      {/* Ceremonia y recepción */}
      <section className="rounded-sm border border-[#e0d8cc] bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-xl text-[#2c2c2c]">
          <Type className="h-5 w-5 text-[#8b9d83]" />
          Lugares del evento
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {(["ceremony", "reception"] as const).map((key) => (
            <div key={key} className="space-y-3">
              <h3 className="font-serif text-lg capitalize text-[#8b7355]">
                {key === "ceremony" ? "Ceremonia" : "Recepción"}
              </h3>
              <div>
                <label className={labelClass}>Lugar</label>
                <input
                  className={inputClass}
                  value={config[key].name}
                  onChange={(e) =>
                    setConfig({ ...config, [key]: { ...config[key], name: e.target.value } })
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Hora</label>
                <input
                  className={inputClass}
                  value={config[key].time}
                  onChange={(e) =>
                    setConfig({ ...config, [key]: { ...config[key], time: e.target.value } })
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Dirección</label>
                <input
                  className={inputClass}
                  value={config[key].address}
                  onChange={(e) =>
                    setConfig({ ...config, [key]: { ...config[key], address: e.target.value } })
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Google Maps URL</label>
                <input
                  className={inputClass}
                  value={config[key].mapsUrl}
                  onChange={(e) =>
                    setConfig({ ...config, [key]: { ...config[key], mapsUrl: e.target.value } })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mesa de regalos */}
      <section className="rounded-sm border border-[#e0d8cc] bg-white p-6">
        <h2 className="mb-4 font-serif text-xl text-[#2c2c2c]">Mesa de regalos</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Banco</label>
            <input
              className={inputClass}
              value={config.gifts.bank}
              onChange={(e) =>
                setConfig({ ...config, gifts: { ...config.gifts, bank: e.target.value } })
              }
            />
          </div>
          <div>
            <label className={labelClass}>Titular</label>
            <input
              className={inputClass}
              value={config.gifts.accountName}
              onChange={(e) =>
                setConfig({
                  ...config,
                  gifts: { ...config.gifts, accountName: e.target.value },
                })
              }
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>CLABE</label>
            <input
              className={inputClass}
              value={config.gifts.clabe}
              onChange={(e) =>
                setConfig({ ...config, gifts: { ...config.gifts, clabe: e.target.value } })
              }
            />
          </div>
        </div>
      </section>

      {/* Música y sobre */}
      <section className="rounded-sm border border-[#e0d8cc] bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-xl text-[#2c2c2c]">
          <Music className="h-5 w-5 text-[#8b9d83]" />
          Experiencia
        </h2>
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm text-[#2c2c2c]">
            <input
              type="checkbox"
              checked={config.music.enabled}
              onChange={(e) =>
                setConfig({ ...config, music: { ...config.music, enabled: e.target.checked } })
              }
            />
            Música de fondo
          </label>
          <div>
            <label className={labelClass}>URL de música (MP3)</label>
            <input
              className={inputClass}
              value={config.music.url}
              onChange={(e) =>
                setConfig({ ...config, music: { ...config.music, url: e.target.value } })
              }
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-[#2c2c2c]">
            <input
              type="checkbox"
              checked={config.envelope.enabled}
              onChange={(e) =>
                setConfig({
                  ...config,
                  envelope: { ...config.envelope, enabled: e.target.checked },
                })
              }
            />
            Animación de sobre al entrar
          </label>
          <div>
            <label className={labelClass}>Mensaje del sobre</label>
            <input
              className={inputClass}
              value={config.envelope.message}
              onChange={(e) =>
                setConfig({
                  ...config,
                  envelope: { ...config.envelope, message: e.target.value },
                })
              }
            />
          </div>
        </div>
      </section>

      {/* Colores damas */}
      <section className="rounded-sm border border-[#e0d8cc] bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-xl text-[#2c2c2c]">
          <Palette className="h-5 w-5 text-[#8b9d83]" />
          Paleta de colores — Damas
        </h2>
        <div className="space-y-3">
          {config.dressCode.ladies.colors.map((color, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                type="color"
                value={color.hex}
                onChange={(e) => {
                  const colors = [...config.dressCode.ladies.colors];
                  colors[i] = { ...color, hex: e.target.value };
                  setConfig({
                    ...config,
                    dressCode: {
                      ...config.dressCode,
                      ladies: { ...config.dressCode.ladies, colors },
                    },
                  });
                }}
                className="h-10 w-10 cursor-pointer rounded-full border-0"
              />
              <input
                className={inputClass}
                value={color.name}
                placeholder="Nombre del color"
                onChange={(e) => {
                  const colors = [...config.dressCode.ladies.colors];
                  colors[i] = { ...color, name: e.target.value };
                  setConfig({
                    ...config,
                    dressCode: {
                      ...config.dressCode,
                      ladies: { ...config.dressCode.ladies, colors },
                    },
                  });
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#8b9d83] px-6 py-3 text-sm uppercase tracking-[0.1em] text-white disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#8b9d83] px-6 py-3 text-sm uppercase tracking-[0.1em] text-[#8b9d83]"
        >
          <Mail className="h-4 w-4" />
          Ver invitación
        </a>
        {message && <p className="text-sm text-[#5c5348]">{message}</p>}
      </div>
    </form>
  );
}
