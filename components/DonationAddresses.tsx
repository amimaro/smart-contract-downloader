// components/DonationAddresses.tsx
import React from "react";
import { toast } from "sonner";

type AddrKind = "ethereum" | "bitcoin" | "solana";

function truncateAddress(kind: AddrKind, address: string) {
  const a = address.trim();
  if (!a) return "";

  if (kind === "ethereum") {
    // exibir: 0x + 5 chars ... + 5 últimos chars
    // Ex.: 0x12345...cdef0
    const has0x = a.toLowerCase().startsWith("0x");
    const core = has0x ? a.slice(2) : a;

    if (core.length <= 10) return has0x ? `0x${core}` : core;

    const first5 = core.slice(0, 5);
    const last5 = core.slice(-5);
    return `0x${first5}...${last5}`;
  }

  // solana/bitcoin: primeiros e últimos 7 dígitos (chars)
  if (a.length <= 14) return a;
  const first7 = a.slice(0, 7);
  const last7 = a.slice(-7);
  return `${first7}...${last7}`;
}

function Row({
  label,
  kind,
  address,
}: {
  label: string;
  kind: AddrKind;
  address: string;
}) {
  const pretty = truncateAddress(kind, address);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address.trim());
      toast.success(`Address ${label} copied to clipboard`);
    } catch {
      // fallback simples
      const el = document.createElement("textarea");
      el.value = address.trim();
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-md border px-3 py-2">
      <div className="min-w-0">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-sm text-muted-foreground font-mono truncate">
          {pretty}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={copy}
          className="rounded-md border px-2 py-1 text-sm hover:bg-accent"
          aria-label={`Copy address ${label}`}
        >
          Copy
        </button>
      </div>
    </div>
  );
}

/**
 * Variáveis de ambiente (Next.js):
 * - NEXT_PUBLIC_DONATION_ETH_ADDRESS
 * - NEXT_PUBLIC_DONATION_BTC_ADDRESS
 * - NEXT_PUBLIC_DONATION_SOL_ADDRESS
 *
 * O componente não renderiza se nenhuma estiver definida.
 */
export default function DonationAddresses() {
  const eth = process.env.NEXT_PUBLIC_DONATION_ETH_ADDRESS?.trim() ?? "";
  const btc = process.env.NEXT_PUBLIC_DONATION_BTC_ADDRESS?.trim() ?? "";
  const sol = process.env.NEXT_PUBLIC_DONATION_SOL_ADDRESS?.trim() ?? "";

  const hasAny = Boolean(eth || btc || sol);
  if (!hasAny) return null;

  return (
    <section className="w-full max-w-xl rounded-lg border p-4">
      <div className="mb-3">
        <h3 className="text-base font-semibold">
          Support the project
        </h3>
        <p className="text-sm text-muted-foreground">
          If you want to contribute, you can donate to the addresses below:
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {eth && <Row label="Ethereum" kind="ethereum" address={eth} />}
        {btc && <Row label="Bitcoin" kind="bitcoin" address={btc} />}
        {sol && <Row label="Solana" kind="solana" address={sol} />}
      </div>
    </section>
  );
}