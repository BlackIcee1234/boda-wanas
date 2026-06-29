"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, Phone, Users, Utensils, CheckCircle2 } from "lucide-react";

interface GuestData {
  id: string;
  name: string;
  maxGuests: number;
  hasRsvp: boolean;
}

type Attendance = "YES" | "NO" | "MAYBE";
type FoodType = "NORMAL" | "VEGETARIAN";

export function RSVP() {
  const [code, setCode] = useState("");
  const [guest, setGuest] = useState<GuestData | null>(null);
  const [lookupError, setLookupError] = useState("");
  const [lookupLoading, setLookupLoading] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("YES");
  const [guestCount, setGuestCount] = useState(1);
  const [companionNames, setCompanionNames] = useState("");
  const [foodType, setFoodType] = useState<FoodType>("NORMAL");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  async function handleLookup(e: FormEvent) {
    e.preventDefault();
    setLookupError("");
    setLookupLoading(true);

    try {
      const res = await fetch(`/api/guests/lookup?code=${encodeURIComponent(code.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        setLookupError(data.error ?? "Código no encontrado");
        setGuest(null);
        return;
      }

      setGuest(data.guest);
      setName(data.guest.name);
      setGuestCount(1);
      setSubmitSuccess(false);
    } catch {
      setLookupError("Error al buscar invitación. Intenta de nuevo.");
    } finally {
      setLookupLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!guest) return;

    setSubmitError("");
    setSubmitLoading(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestId: guest.id,
          name: name.trim(),
          phone: phone.trim(),
          attendance,
          guestCount: attendance === "YES" ? guestCount : 0,
          companionNames: companionNames.trim() || null,
          foodType: attendance === "YES" ? foodType : "NORMAL",
          dietaryRestrictions: dietaryRestrictions.trim() || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error ?? "Error al enviar confirmación");
        return;
      }

      setSubmitSuccess(true);
      setGuest({ ...guest, hasRsvp: true });
    } catch {
      setSubmitError("Error al enviar confirmación. Intenta de nuevo.");
    } finally {
      setSubmitLoading(false);
    }
  }

  return (
    <section id="rsvp" className="bg-[#faf7f2] px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="mb-2 flex items-center justify-center gap-2 font-serif text-xs uppercase tracking-[0.35em] text-[#8b9d83]">
            <Mail className="h-4 w-4" />
            Confirmación
          </p>
          <h2 className="font-serif text-3xl text-[#2c2c2c] sm:text-4xl md:text-5xl">
            RSVP
          </h2>
          <p className="mt-4 text-sm text-[#5c5348] sm:text-base">
            Ingresa tu código de invitación para confirmar tu asistencia.
          </p>
        </motion.div>

        {!guest ? (
          <form onSubmit={handleLookup} className="space-y-4">
            <div>
              <label htmlFor="code" className="mb-1 block text-xs uppercase tracking-[0.15em] text-[#8b9d83]">
                Código de invitación
              </label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                placeholder="Ej: FAMILIA01"
                className="w-full rounded-sm border border-[#e0d8cc] bg-white px-4 py-3 text-[#2c2c2c] outline-none focus:border-[#8b9d83]"
              />
            </div>
            {lookupError && (
              <p className="text-sm text-red-600" role="alert">
                {lookupError}
              </p>
            )}
            <button
              type="submit"
              disabled={lookupLoading}
              className="w-full rounded-sm bg-[#8b9d83] px-5 py-3 text-sm uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {lookupLoading ? "Buscando..." : "Buscar invitación"}
            </button>
          </form>
        ) : submitSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-sm border border-[#8b9d83] bg-white/80 p-8 text-center"
          >
            <p className="font-serif text-2xl text-[#2c2c2c] flex items-center justify-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-[#8b9d83]" />
              ¡Gracias!
            </p>
            <p className="mt-3 text-[#5c5348]">
              Tu confirmación ha sido registrada exitosamente.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="rounded-sm border border-[#e0d8cc] bg-white/60 p-4 text-sm text-[#5c5348]">
              <p>
                Invitados permitidos: <strong>{guest.maxGuests}</strong>
              </p>
              {guest.hasRsvp && (
                <p className="mt-1 text-[#8b7355]">
                  Ya tienes una confirmación registrada. Puedes actualizarla.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="name" className="mb-1 flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-[#8b9d83]">
                <User className="h-3.5 w-3.5" />
                Nombre del invitado principal
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-sm border border-[#e0d8cc] bg-white px-4 py-3 text-[#2c2c2c] outline-none focus:border-[#8b9d83]"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-[#8b9d83]">
                <Phone className="h-3.5 w-3.5" />
                Teléfono
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full rounded-sm border border-[#e0d8cc] bg-white px-4 py-3 text-[#2c2c2c] outline-none focus:border-[#8b9d83]"
              />
            </div>

            <fieldset>
              <legend className="mb-2 text-xs uppercase tracking-[0.15em] text-[#8b9d83]">
                Confirmación de asistencia
              </legend>
              <div className="flex flex-wrap gap-3">
                {(
                  [
                    { value: "YES", label: "Sí" },
                    { value: "NO", label: "No" },
                    { value: "MAYBE", label: "Tal vez" },
                  ] as const
                ).map((opt) => (
                  <label
                    key={opt.value}
                    className={`cursor-pointer rounded-sm border px-4 py-2 text-sm transition-colors ${
                      attendance === opt.value
                        ? "border-[#8b9d83] bg-[#8b9d83] text-white"
                        : "border-[#e0d8cc] bg-white text-[#5c5348]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value={opt.value}
                      checked={attendance === opt.value}
                      onChange={() => setAttendance(opt.value)}
                      className="sr-only"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>

            {attendance === "YES" && (
              <>
                <div>
                  <label htmlFor="guestCount" className="mb-1 flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-[#8b9d83]">
                    <Users className="h-3.5 w-3.5" />
                    Número de asistentes (máx. {guest.maxGuests})
                  </label>
                  <input
                    id="guestCount"
                    type="number"
                    min={1}
                    max={guest.maxGuests}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    required
                    className="w-full rounded-sm border border-[#e0d8cc] bg-white px-4 py-3 text-[#2c2c2c] outline-none focus:border-[#8b9d83]"
                  />
                </div>

                {guestCount > 1 && (
                  <div>
                    <label htmlFor="companions" className="mb-1 block text-xs uppercase tracking-[0.15em] text-[#8b9d83]">
                      Nombres de acompañantes
                    </label>
                    <textarea
                      id="companions"
                      value={companionNames}
                      onChange={(e) => setCompanionNames(e.target.value)}
                      rows={2}
                      placeholder="Separados por coma"
                      className="w-full rounded-sm border border-[#e0d8cc] bg-white px-4 py-3 text-[#2c2c2c] outline-none focus:border-[#8b9d83]"
                    />
                  </div>
                )}

                <fieldset>
                  <legend className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-[#8b9d83]">
                    <Utensils className="h-3.5 w-3.5" />
                    Tipo de comida
                  </legend>
                  <div className="flex flex-wrap gap-3">
                    {(
                      [
                        { value: "NORMAL", label: "Normal" },
                        { value: "VEGETARIAN", label: "Vegetariana" },
                      ] as const
                    ).map((opt) => (
                      <label
                        key={opt.value}
                        className={`cursor-pointer rounded-sm border px-4 py-2 text-sm transition-colors ${
                          foodType === opt.value
                            ? "border-[#8b9d83] bg-[#8b9d83] text-white"
                            : "border-[#e0d8cc] bg-white text-[#5c5348]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="foodType"
                          value={opt.value}
                          checked={foodType === opt.value}
                          onChange={() => setFoodType(opt.value)}
                          className="sr-only"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="dietary" className="mb-1 block text-xs uppercase tracking-[0.15em] text-[#8b9d83]">
                    Restricciones alimenticias (opcional)
                  </label>
                  <textarea
                    id="dietary"
                    value={dietaryRestrictions}
                    onChange={(e) => setDietaryRestrictions(e.target.value)}
                    rows={2}
                    className="w-full rounded-sm border border-[#e0d8cc] bg-white px-4 py-3 text-[#2c2c2c] outline-none focus:border-[#8b9d83]"
                  />
                </div>
              </>
            )}

            {submitError && (
              <p className="text-sm text-red-600" role="alert">
                {submitError}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setGuest(null);
                  setCode("");
                }}
                className="rounded-sm border border-[#e0d8cc] px-5 py-3 text-sm uppercase tracking-[0.15em] text-[#5c5348]"
              >
                Cambiar código
              </button>
              <button
                type="submit"
                disabled={submitLoading}
                className="flex-1 rounded-sm bg-[#8b9d83] px-5 py-3 text-sm uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {submitLoading ? "Enviando..." : "Confirmar asistencia"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
