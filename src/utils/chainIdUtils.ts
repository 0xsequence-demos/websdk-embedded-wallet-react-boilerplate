import { networks } from "@0xsequence/network";
const networkKeys = Object.keys(networks);
const networkNames = Object.values(networks).map((n) => n.name);
export function chainIdsFromString(str: string) {
  const arr = str
    .split(",")
    .map((v) => v.trim())
    .map(chainIdFromString)
    .filter((v) => v !== undefined);
  return Array.from(new Set(arr));
}

export function chainIdFromString(str: string) {
  if (networkKeys.includes(str)) {
    return parseInt(str);
  } else if (networkNames.includes(str)) {
    return parseInt(networkKeys[networkNames.indexOf(str)]);
  } else {
    console.warn(`Could not find network by identifier: ${str}`);
    return undefined;
  }
}
