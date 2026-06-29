"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  Save,
  Image as ImageIcon,
  Mail,
  Heart,
  Palette,
  Type,
  Share2,
  Clock,
  Gift,
  Plus,
  Trash2,
  Shirt,
  MailOpen,
} from "lucide-react";
import type { SiteConfig, TimelineEvent } from "@/types/site-config";

const inputClass =
  "w-full rounded-sm border border-[#e0d8cc] bg-white px-3 py-2 text-sm text-[#2c2c2c] outline-none focus:border-[#8b9d83]";
const labelClass = "mb-1 block text-xs uppercase tracking-[0.1em] text-[#8b9d83]";

const TIMELINE_ICONS: TimelineEvent["icon"][] = [
  "church",
  "party",
  "camera",
  "utensils",
  "music",
  "heart",
];

function ColorEditor({
  colors,
  onChange,
}: {
  colors: SiteConfig["dressCode"]["ladies"]["colors"];
  onChange: (colors: SiteConfig["dressCode"]["ladies"]["colors"]) => void;
}) {
  return (
    <div className="space-y-3">
      {colors.map((color, i) => (
        <div key={i} className="flex items-center gap-3">
          <input
            type="color"
            value={color.hex}
            onChange={(e) => {
              const next = [...colors];
              next[i] = { ...color, hex: e.target.value };
              onChange(next);
            }}
            className="h-10 w-10 cursor-pointer rounded-full border-0"
          />
          <input
            className={inputClass}
            value={color.name}
            placeholder="Nombre del color"
            onChange={(e) => {
              const next = [...colors];
              next[i] = { ...color, name: e.target.value };
              onChange(next);
            }}
          />
          <button
            type="button"
            onClick={() => onChange(colors.filter((_, idx) => idx !== i))}
            className="text-red-500 hover:text-red-700"
            aria-label="Eliminar color"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...colors, { hex: "#888888", name: "Nuevo color" }])}
        className="inline-flex items-center gap-1 text-sm text-[#8b9d83]"
      >
        <Plus className="h-4 w-4" /> Agregar color
      </button>
    </div>
  );
}

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

    setMessage(res.ok ? "¡Cambios guardados correctamente!" : "Error al guardar.");
    setSaving(false);
  }

  function updateTimeline(index: number, field: keyof TimelineEvent, value: string) {
    if (!config) return;
    const timeline = [...config.timeline];
    timeline[index] = { ...timeline[index], [field]: value };
    setConfig({ ...config, timeline });
  }

  if (!config) return <p className="text-[#5c5348]">Cargando configuración...</p>;

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* SEO / Compartir */}
      <section className="rounded-sm border border-[#e0d8cc] bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-xl text-[#2c2c2c]">
          <Share2 className="h-5 w-5 text-[#8b9d83]" />
          Compartir en redes (WhatsApp, Facebook, etc.)
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Nombre del sitio</label>
            <input
              className={inputClass}
              value={config.seo.siteName}
              onChange={(e) =>
                setConfig({ ...config, seo: { ...config.seo, siteName: e.target.value } })
              }
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Título al compartir</label>
            <input
              className={inputClass}
              value={config.seo.shareTitle}
              onChange={(e) =>
                setConfig({ ...config, seo: { ...config.seo, shareTitle: e.target.value } })
              }
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Descripción al compartir</label>
            <textarea
              className={inputClass}
              rows={2}
              value={config.seo.shareDescription}
              onChange={(e) =>
                setConfig({
                  ...config,
                  seo: { ...config.seo, shareDescription: e.target.value },
                })
              }
            />
          </div>
        </div>
        <label className={`${labelClass} mt-4`}>Imagen al compartir (preview)</label>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {images.map((src) => (
            <button
              key={`seo-${src}`}
              type="button"
              onClick={() =>
                setConfig({ ...config, seo: { ...config.seo, shareImage: src } })
              }
              className={`relative aspect-square overflow-hidden rounded-sm border-2 ${
                config.seo.shareImage === src
                  ? "border-[#8b9d83] ring-2 ring-[#8b9d83]/30"
                  : "border-transparent"
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="100px" />
            </button>
          ))}
        </div>
      </section>

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
            <label className={labelClass}>Fecha ISO (cuenta regresiva)</label>
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
        <label className={labelClass}>Foto principal (Hero)</label>
        <div className="mb-6 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {images.map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => setConfig({ ...config, heroImage: src })}
              className={`relative aspect-square overflow-hidden rounded-sm border-2 ${
                config.heroImage === src ? "border-[#8b9d83] ring-2 ring-[#8b9d83]/30" : ""
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="100px" />
            </button>
          ))}
        </div>
        <label className={labelClass}>Galería (clic para incluir/excluir)</label>
        <div className="mb-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
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
                          alt: config.couple.display,
                        },
                      ],
                    });
                  }
                }}
                className={`relative aspect-square overflow-hidden rounded-sm border-2 ${
                  inGallery ? "border-[#8b9d83]" : "opacity-50"
                }`}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="100px" />
              </button>
            );
          })}
        </div>
        {config.galleryImages.map((img, i) => (
          <div key={img.src} className="mb-2">
            <label className={labelClass}>Texto alternativo — foto {i + 1}</label>
            <input
              className={inputClass}
              value={img.alt}
              onChange={(e) => {
                const galleryImages = [...config.galleryImages];
                galleryImages[i] = { ...img, alt: e.target.value };
                setConfig({ ...config, galleryImages });
              }}
            />
          </div>
        ))}
      </section>

      {/* Timeline */}
      <section className="rounded-sm border border-[#e0d8cc] bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-xl text-[#2c2c2c]">
          <Clock className="h-5 w-5 text-[#8b9d83]" />
          Itinerario del día
        </h2>
        <div className="space-y-4">
          {config.timeline.map((event, i) => (
            <div key={event.id} className="rounded-sm border border-[#e0d8cc] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-serif text-[#8b7355]">Evento {i + 1}</span>
                <button
                  type="button"
                  onClick={() =>
                    setConfig({
                      ...config,
                      timeline: config.timeline.filter((_, idx) => idx !== i),
                    })
                  }
                  className="text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Hora</label>
                  <input
                    className={inputClass}
                    value={event.time}
                    onChange={(e) => updateTimeline(i, "time", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Icono</label>
                  <select
                    className={inputClass}
                    value={event.icon}
                    onChange={(e) => updateTimeline(i, "icon", e.target.value)}
                  >
                    {TIMELINE_ICONS.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Título</label>
                  <input
                    className={inputClass}
                    value={event.title}
                    onChange={(e) => updateTimeline(i, "title", e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Descripción</label>
                  <input
                    className={inputClass}
                    value={event.description}
                    onChange={(e) => updateTimeline(i, "description", e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Google Maps (opcional)</label>
                  <input
                    className={inputClass}
                    value={event.mapsUrl ?? ""}
                    onChange={(e) => updateTimeline(i, "mapsUrl", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setConfig({
                ...config,
                timeline: [
                  ...config.timeline,
                  {
                    id: `event-${Date.now()}`,
                    time: "00:00 PM",
                    title: "Nuevo evento",
                    description: "Descripción",
                    icon: "heart",
                  },
                ],
              })
            }
            className="inline-flex items-center gap-1 text-sm text-[#8b9d83]"
          >
            <Plus className="h-4 w-4" /> Agregar evento
          </button>
        </div>
      </section>

      {/* Lugares */}
      <section className="rounded-sm border border-[#e0d8cc] bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-xl text-[#2c2c2c]">
          <Type className="h-5 w-5 text-[#8b9d83]" />
          Lugares del evento
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {(["ceremony", "reception"] as const).map((key) => (
            <div key={key} className="space-y-3">
              <h3 className="font-serif text-lg text-[#8b7355]">
                {key === "ceremony" ? "Ceremonia" : "Recepción"}
              </h3>
              {(["name", "time", "address", "mapsUrl"] as const).map((field) => (
                <div key={field}>
                  <label className={labelClass}>
                    {field === "name"
                      ? "Lugar"
                      : field === "time"
                        ? "Hora"
                        : field === "address"
                          ? "Dirección"
                          : "Google Maps URL"}
                  </label>
                  <input
                    className={inputClass}
                    value={config[key][field]}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        [key]: { ...config[key], [field]: e.target.value },
                      })
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Vestimenta */}
      <section className="rounded-sm border border-[#e0d8cc] bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-xl text-[#2c2c2c]">
          <Shirt className="h-5 w-5 text-[#8b9d83]" />
          Código de vestimenta
        </h2>
        <div className="mb-4">
          <label className={labelClass}>Título</label>
          <input
            className={inputClass}
            value={config.dressCode.title}
            onChange={(e) =>
              setConfig({
                ...config,
                dressCode: { ...config.dressCode, title: e.target.value },
              })
            }
          />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {(["ladies", "gentlemen"] as const).map((group) => (
            <div key={group}>
              <h3 className="mb-3 font-serif text-lg text-[#8b7355]">
                {group === "ladies" ? "Damas" : "Caballeros"}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className={labelClass}>Etiqueta</label>
                  <input
                    className={inputClass}
                    value={config.dressCode[group].label}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        dressCode: {
                          ...config.dressCode,
                          [group]: { ...config.dressCode[group], label: e.target.value },
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <label className={labelClass}>Descripción</label>
                  <input
                    className={inputClass}
                    value={config.dressCode[group].description}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        dressCode: {
                          ...config.dressCode,
                          [group]: {
                            ...config.dressCode[group],
                            description: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <label className={labelClass}>Recomendación</label>
                  <textarea
                    className={inputClass}
                    rows={2}
                    value={config.dressCode[group].tip}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        dressCode: {
                          ...config.dressCode,
                          [group]: { ...config.dressCode[group], tip: e.target.value },
                        },
                      })
                    }
                  />
                </div>
                <label className={labelClass}>Paleta de colores</label>
                <ColorEditor
                  colors={config.dressCode[group].colors}
                  onChange={(colors) =>
                    setConfig({
                      ...config,
                      dressCode: {
                        ...config.dressCode,
                        [group]: { ...config.dressCode[group], colors },
                      },
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Regalos */}
      <section className="rounded-sm border border-[#e0d8cc] bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-xl text-[#2c2c2c]">
          <Gift className="h-5 w-5 text-[#8b9d83]" />
          Mesa de regalos
        </h2>
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass}>Título de la sección</label>
            <input
              className={inputClass}
              value={config.gifts.sectionTitle}
              onChange={(e) =>
                setConfig({
                  ...config,
                  gifts: { ...config.gifts, sectionTitle: e.target.value },
                })
              }
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Subtítulo de la sección</label>
            <textarea
              className={inputClass}
              rows={2}
              value={config.gifts.sectionSubtitle}
              onChange={(e) =>
                setConfig({
                  ...config,
                  gifts: { ...config.gifts, sectionSubtitle: e.target.value },
                })
              }
            />
          </div>
        </div>

        {/* Transferencia bancaria */}
        <div className="mb-6 rounded-sm border border-[#e0d8cc] p-4">
          <label className="mb-4 flex items-center gap-2 text-sm font-medium text-[#2c2c2c]">
            <input
              type="checkbox"
              checked={config.gifts.bankTransfer.enabled}
              onChange={(e) =>
                setConfig({
                  ...config,
                  gifts: {
                    ...config.gifts,
                    bankTransfer: {
                      ...config.gifts.bankTransfer,
                      enabled: e.target.checked,
                    },
                  },
                })
              }
            />
            Mostrar transferencia bancaria
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass}>Título</label>
              <input
                className={inputClass}
                value={config.gifts.bankTransfer.title}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    gifts: {
                      ...config.gifts,
                      bankTransfer: {
                        ...config.gifts.bankTransfer,
                        title: e.target.value,
                      },
                    },
                  })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Banco</label>
              <input
                className={inputClass}
                value={config.gifts.bankTransfer.bank}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    gifts: {
                      ...config.gifts,
                      bankTransfer: {
                        ...config.gifts.bankTransfer,
                        bank: e.target.value,
                      },
                    },
                  })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Titular</label>
              <input
                className={inputClass}
                value={config.gifts.bankTransfer.accountName}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    gifts: {
                      ...config.gifts,
                      bankTransfer: {
                        ...config.gifts.bankTransfer,
                        accountName: e.target.value,
                      },
                    },
                  })
                }
              />
            </div>
            <div>
              <label className={labelClass}>CLABE</label>
              <input
                className={inputClass}
                value={config.gifts.bankTransfer.clabe}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    gifts: {
                      ...config.gifts,
                      bankTransfer: {
                        ...config.gifts.bankTransfer,
                        clabe: e.target.value,
                      },
                    },
                  })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Concepto</label>
              <input
                className={inputClass}
                value={config.gifts.bankTransfer.concept}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    gifts: {
                      ...config.gifts,
                      bankTransfer: {
                        ...config.gifts.bankTransfer,
                        concept: e.target.value,
                      },
                    },
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Liverpool */}
        <div className="mb-6 rounded-sm border border-[#e0d8cc] p-4">
          <label className="mb-4 flex items-center gap-2 text-sm font-medium text-[#2c2c2c]">
            <input
              type="checkbox"
              checked={config.gifts.liverpool.enabled}
              onChange={(e) =>
                setConfig({
                  ...config,
                  gifts: {
                    ...config.gifts,
                    liverpool: { ...config.gifts.liverpool, enabled: e.target.checked },
                  },
                })
              }
            />
            Mostrar mesa Liverpool
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Título</label>
              <input
                className={inputClass}
                value={config.gifts.liverpool.title}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    gifts: {
                      ...config.gifts,
                      liverpool: { ...config.gifts.liverpool, title: e.target.value },
                    },
                  })
                }
              />
            </div>
            <div>
              <label className={labelClass}>No. de evento</label>
              <input
                className={inputClass}
                value={config.gifts.liverpool.eventNumber}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    gifts: {
                      ...config.gifts,
                      liverpool: {
                        ...config.gifts.liverpool,
                        eventNumber: e.target.value,
                      },
                    },
                  })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>URL de la mesa</label>
              <input
                className={inputClass}
                value={config.gifts.liverpool.url}
                placeholder="https://www.liverpool.com.mx/..."
                onChange={(e) =>
                  setConfig({
                    ...config,
                    gifts: {
                      ...config.gifts,
                      liverpool: { ...config.gifts.liverpool, url: e.target.value },
                    },
                  })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Descripción</label>
              <textarea
                className={inputClass}
                rows={2}
                value={config.gifts.liverpool.description}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    gifts: {
                      ...config.gifts,
                      liverpool: {
                        ...config.gifts.liverpool,
                        description: e.target.value,
                      },
                    },
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Otra mesa */}
        <div className="rounded-sm border border-[#e0d8cc] p-4">
          <label className="mb-4 flex items-center gap-2 text-sm font-medium text-[#2c2c2c]">
            <input
              type="checkbox"
              checked={config.gifts.custom.enabled}
              onChange={(e) =>
                setConfig({
                  ...config,
                  gifts: {
                    ...config.gifts,
                    custom: { ...config.gifts.custom, enabled: e.target.checked },
                  },
                })
              }
            />
            Mostrar otra mesa de regalos
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Título (ej. Amazon, Palacio de Hierro)</label>
              <input
                className={inputClass}
                value={config.gifts.custom.title}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    gifts: {
                      ...config.gifts,
                      custom: { ...config.gifts.custom, title: e.target.value },
                    },
                  })
                }
              />
            </div>
            <div>
              <label className={labelClass}>Referencia / No. de evento</label>
              <input
                className={inputClass}
                value={config.gifts.custom.reference}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    gifts: {
                      ...config.gifts,
                      custom: { ...config.gifts.custom, reference: e.target.value },
                    },
                  })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>URL</label>
              <input
                className={inputClass}
                value={config.gifts.custom.url}
                placeholder="https://..."
                onChange={(e) =>
                  setConfig({
                    ...config,
                    gifts: {
                      ...config.gifts,
                      custom: { ...config.gifts.custom, url: e.target.value },
                    },
                  })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Descripción</label>
              <textarea
                className={inputClass}
                rows={2}
                value={config.gifts.custom.description}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    gifts: {
                      ...config.gifts,
                      custom: { ...config.gifts.custom, description: e.target.value },
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section className="rounded-sm border border-[#e0d8cc] bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-xl text-[#2c2c2c]">
          <MailOpen className="h-5 w-5 text-[#8b9d83]" />
          Experiencia de entrada
        </h2>
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm">
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
