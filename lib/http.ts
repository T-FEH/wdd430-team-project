import 'server-only';
import { NextResponse } from 'next/server';
import type { FieldErrors } from './tasks/validation';

export function jsonError(message: string, status: number, fieldErrors?: FieldErrors) {
  return NextResponse.json(fieldErrors ? { error: message, fieldErrors } : { error: message }, {
    status,
  });
}

export type ParsedBody = { ok: true; data: unknown } | { ok: false };

/** Reads a JSON request body without throwing on malformed input. */
export async function parseJsonBody(request: Request): Promise<ParsedBody> {
  try {
    return { ok: true, data: await request.json() };
  } catch {
    return { ok: false };
  }
}
