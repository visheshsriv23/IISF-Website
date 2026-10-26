import type { FieldDef } from "@/shared/resources";

const input = "w-full rounded-[10px] border-3 border-ink bg-paper px-3 py-2 focus:outline-4 focus:outline-lime";

/** ISO timestamp ⇄ value for <input type="datetime-local"> (local time). */
const toLocalInput = (iso: string) => (iso ? new Date(new Date(iso).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : "");

type Props = { field: FieldDef; value: unknown; onChange: (value: unknown) => void; readOnly?: boolean };

/** Renders one admin form control from the shared field config. */
export function AdminField({ field, value, onChange, readOnly }: Props) {
  const id = `f-${field.name}`;
  const common = { id, name: field.name, disabled: readOnly, className: input };
  const text = (value ?? "") as string;

  let control;
  switch (field.type) {
    case "textarea":
      control = <textarea {...common} rows={4} value={text} onChange={(e) => onChange(e.target.value)} />;
      break;
    case "list":
      control = <textarea {...common} rows={4} value={((value as string[]) ?? []).join("\n")} onChange={(e) => onChange(e.target.value.split("\n"))} />;
      break;
    case "select":
      control = (
        <select {...common} value={text} onChange={(e) => onChange(e.target.value)}>
          <option value="" disabled>Pick…</option>
          {field.options?.map((o) => <option key={o}>{o}</option>)}
        </select>
      );
      break;
    case "boolean":
      return (
        <label className="flex items-center gap-3 font-bold">
          <input type="checkbox" id={id} disabled={readOnly} checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="size-6 accent-lime" />
          {field.label}
        </label>
      );
    case "number":
      control = <input {...common} type="number" value={text} onChange={(e) => onChange(e.target.value)} />;
      break;
    case "datetime":
      control = <input {...common} type="datetime-local" value={toLocalInput(text)} onChange={(e) => onChange(e.target.value ? new Date(e.target.value).toISOString() : "")} />;
      break;
    default:
      control = <input {...common} type={field.type} value={text} onChange={(e) => onChange(e.target.value)} />;
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-bold">
        {field.label} {field.required && <span className="text-pink">*</span>}
      </label>
      {control}
      {field.hint && <p className="text-sm opacity-60">{field.hint}</p>}
    </div>
  );
}
