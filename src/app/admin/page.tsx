"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

interface Stats {
  totalGuests: number;
  confirmed: number;
  declined: number;
  maybe: number;
  pending: number;
  totalPeople: number;
}

interface GuestRow {
  id: string;
  code: string;
  name: string;
  phone: string | null;
  maxGuests: number;
  rsvp: {
    attendance: string;
    guestCount: number;
    companionNames: string | null;
    foodType: string;
    registeredAt: string;
  } | null;
}

const attendanceLabels: Record<string, string> = {
  YES: "Confirmado",
  NO: "No asiste",
  MAYBE: "Tal vez",
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [stats, setStats] = useState<Stats | null>(null);
  const [guests, setGuests] = useState<GuestRow[]>([]);
  const [filter, setFilter] = useState<"all" | "confirmed" | "pending">("all");
  const [importMessage, setImportMessage] = useState("");

  const loadData = useCallback(async () => {
    const res = await fetch("/api/admin/guests");
    if (res.ok) {
      const data = await res.json();
      setStats(data.stats);
      setGuests(data.guests);
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setLoginError("Contraseña incorrecta");
        return;
      }

      await loadData();
    } catch {
      setLoginError("Error al iniciar sesión");
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleImport(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/admin/import", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setImportMessage(
        `Importados: ${data.imported}, Actualizados: ${data.updated}${
          data.errors?.length ? `. Errores: ${data.errors.length}` : ""
        }`
      );
      await loadData();
      form.reset();
    } else {
      setImportMessage(data.error ?? "Error al importar");
    }
  }

  const filteredGuests = guests.filter((g) => {
    if (filter === "confirmed") return g.rsvp?.attendance === "YES";
    if (filter === "pending") return !g.rsvp;
    return true;
  });

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf7f2] px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-sm border border-[#e0d8cc] bg-white p-8 shadow-sm"
        >
          <h1 className="mb-6 text-center font-serif text-2xl text-[#2c2c2c]">
            Panel de Novios
          </h1>
          <label htmlFor="password" className="mb-1 block text-xs uppercase tracking-[0.15em] text-[#8b9d83]">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mb-4 w-full rounded-sm border border-[#e0d8cc] px-4 py-3 outline-none focus:border-[#8b9d83]"
          />
          {loginError && <p className="mb-4 text-sm text-red-600">{loginError}</p>}
          <button
            type="submit"
            disabled={loginLoading}
            className="w-full rounded-sm bg-[#8b9d83] py-3 text-sm uppercase tracking-[0.15em] text-white disabled:opacity-50"
          >
            {loginLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-serif text-3xl text-[#2c2c2c]">Panel de Control</h1>
          <a
            href="/api/admin/import"
            className="inline-flex items-center justify-center rounded-sm border border-[#8b9d83] bg-[#8b9d83] px-5 py-2 text-sm uppercase tracking-[0.1em] text-white"
          >
            Exportar Excel
          </a>
        </div>

        {stats && (
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              { label: "Total invitados", value: stats.totalGuests },
              { label: "Confirmados", value: stats.confirmed },
              { label: "Pendientes", value: stats.pending },
              { label: "No asisten", value: stats.declined },
              { label: "Tal vez", value: stats.maybe },
              { label: "Total personas", value: stats.totalPeople },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-sm border border-[#e0d8cc] bg-white p-4 text-center"
              >
                <p className="text-2xl font-serif text-[#2c2c2c]">{item.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.1em] text-[#8b9d83]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mb-8 rounded-sm border border-[#e0d8cc] bg-white p-6">
          <h2 className="mb-4 font-serif text-xl text-[#2c2c2c]">Importar invitados (Excel)</h2>
          <p className="mb-4 text-sm text-[#5c5348]">
            Columnas requeridas: <code>codigo</code>, <code>nombre</code>, <code>telefono</code>,{" "}
            <code>max_invitados</code>
          </p>
          <form onSubmit={handleImport} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <input
              type="file"
              name="file"
              accept=".xlsx,.xls,.csv"
              required
              className="text-sm"
            />
            <button
              type="submit"
              className="rounded-sm bg-[#8b9d83] px-5 py-2 text-sm uppercase tracking-[0.1em] text-white"
            >
              Importar
            </button>
          </form>
          {importMessage && <p className="mt-3 text-sm text-[#5c5348]">{importMessage}</p>}
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {(
            [
              { key: "all", label: "Todos" },
              { key: "confirmed", label: "Confirmados" },
              { key: "pending", label: "Pendientes" },
            ] as const
          ).map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`rounded-sm px-4 py-2 text-sm ${
                filter === f.key
                  ? "bg-[#8b9d83] text-white"
                  : "border border-[#e0d8cc] bg-white text-[#5c5348]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-sm border border-[#e0d8cc] bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-[#e0d8cc] bg-[#f5f0e8]">
              <tr>
                <th className="px-4 py-3 font-medium text-[#8b9d83]">Código</th>
                <th className="px-4 py-3 font-medium text-[#8b9d83]">Nombre</th>
                <th className="px-4 py-3 font-medium text-[#8b9d83]">Máx.</th>
                <th className="px-4 py-3 font-medium text-[#8b9d83]">Estado</th>
                <th className="px-4 py-3 font-medium text-[#8b9d83]">Asistentes</th>
                <th className="px-4 py-3 font-medium text-[#8b9d83]">Comida</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.map((g) => (
                <tr key={g.id} className="border-b border-[#e0d8cc]/50">
                  <td className="px-4 py-3 font-mono text-xs">{g.code}</td>
                  <td className="px-4 py-3">{g.name}</td>
                  <td className="px-4 py-3">{g.maxGuests}</td>
                  <td className="px-4 py-3">
                    {g.rsvp
                      ? attendanceLabels[g.rsvp.attendance] ?? g.rsvp.attendance
                      : "Pendiente"}
                  </td>
                  <td className="px-4 py-3">{g.rsvp?.guestCount ?? "—"}</td>
                  <td className="px-4 py-3">{g.rsvp?.foodType ?? "—"}</td>
                </tr>
              ))}
              {filteredGuests.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[#5c5348]">
                    No hay invitados registrados. Importa un archivo Excel para comenzar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
