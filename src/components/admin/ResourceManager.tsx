"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { api, type ApiError } from "@/lib/api";
import { RESOURCES, type ResourceDef, type ResourceName } from "@/shared/resources";
import { Button } from "@/components/ui/Button";
import { AdminField } from "./AdminField";

type Row = Record<string, unknown> & { id: string };

const display = (value: unknown) => {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "✓" : "—";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) return new Date(value).toLocaleString("en-IN");
  return String(value ?? "—");
};

/** Generic list + create/edit/delete screen for any resource in the shared registry. */
export function ResourceManager({ name }: { name: ResourceName }) {
  const def: ResourceDef = RESOURCES[name];
  const router = useRouter();
  const [rows, setRows] = useState<Row[] | null>(null);
  const [editing, setEditing] = useState<Partial<Row> | null>(null);
  const [error, setError] = useState("");
  const [version, setVersion] = useState(0);
  const load = () => setVersion((v) => v + 1);

  useEffect(() => {
    let stale = false;
    api<Row[]>(`/api/admin/${name}`)
      .then((data) => !stale && setRows(data))
      .catch((err: ApiError) => {
        if (err.error === "Please log in again.") router.push("/admin/login");
        if (!stale) setError(err.error ?? "Failed to load.");
      });
    return () => void (stale = true);
  }, [name, router, version]);

  async function save() {
    if (!editing) return;
    setError("");
    try {
      const { id, ...values } = editing;
      if (id) await api(`/api/admin/${name}/${id}`, { method: "PATCH", json: values });
      else await api(`/api/admin/${name}`, { method: "POST", json: values });
      setEditing(null);
      load();
    } catch (e) {
      const err = e as ApiError;
      setError([err.error, ...Object.entries(err.fields ?? {}).map(([k, v]) => `${k}: ${v}`)].join(" "));
    }
  }

  async function remove(row: Row) {
    if (!confirm(`Delete "${display(row[def.titleField])}"? This can't be undone.`)) return;
    await api(`/api/admin/${name}/${row.id}`, { method: "DELETE" }).catch((e: ApiError) => setError(e.error));
    load();
  }

  return (
    <div>
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="display text-4xl">{def.label}</h1>
        {!def.readOnly && (
          <Button onClick={() => setEditing({})}>
            <Plus aria-hidden className="size-5" strokeWidth={3} /> Add new
          </Button>
        )}
      </header>

      {error && <p role="alert" className="mb-6 rounded-[10px] border-3 border-ink bg-pink px-4 py-3 font-bold">{error}</p>}

      {!rows ? (
        <p className="hand text-2xl">loading…</p>
      ) : rows.length === 0 ? (
        <p className="hand text-2xl">Nothing here yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-[14px] border-3 border-ink bg-paper shadow-brutal-sm">
          <table className="w-full text-left">
            <thead className="border-b-3 border-ink bg-sun text-sm uppercase tracking-wider">
              <tr>
                <th className="p-3">{def.fields.find((f) => f.name === def.titleField)?.label}</th>
                {def.columns.map((c) => <th key={c} className="p-3">{def.fields.find((f) => f.name === c)?.label ?? c.replace("_", " ")}</th>)}
                <th className="p-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-ink/10">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-cream">
                  <td className="p-3 font-bold">{display(row[def.titleField])}</td>
                  {def.columns.map((c) => <td key={c} className="p-3 text-sm">{display(row[c])}</td>)}
                  <td className="flex justify-end gap-2 p-3">
                    <button type="button" onClick={() => setEditing(row)} aria-label="Open" className="rounded-full border-2 border-ink p-2 hover:bg-lime"><Pencil className="size-4" /></button>
                    <button type="button" onClick={() => remove(row)} aria-label="Delete" className="rounded-full border-2 border-ink p-2 hover:bg-pink"><Trash2 className="size-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div role="dialog" aria-modal aria-label={`${editing.id ? "Edit" : "New"} ${def.label}`} className="fixed inset-0 z-50 flex justify-end bg-ink/40" onClick={() => setEditing(null)}>
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              save();
            }}
            className="flex h-full w-full max-w-xl flex-col gap-5 overflow-y-auto border-l-3 border-ink bg-cream p-6 md:p-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="display text-3xl">{def.readOnly ? "Details" : editing.id ? "Edit" : "New"}</h2>
              <button type="button" aria-label="Close" onClick={() => setEditing(null)} className="rounded-full border-3 border-ink bg-paper p-1.5"><X /></button>
            </div>
            {def.fields.map((field) => (
              <AdminField key={field.name} field={field} value={editing[field.name]} readOnly={def.readOnly} onChange={(v) => setEditing({ ...editing, [field.name]: v })} />
            ))}
            {name === "applications" && typeof editing.deck_url === "string" && editing.deck_url && (
              <a href={editing.deck_url} target="_blank" rel="noreferrer" className="font-bold underline">Open pitch deck ↗</a>
            )}
            {!def.readOnly && <Button type="submit" className="mt-2 self-start">Save</Button>}
          </form>
        </div>
      )}
    </div>
  );
}
