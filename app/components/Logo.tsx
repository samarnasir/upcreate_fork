// Upcreate wordmark (public/logo.png). `size` is the rendered height in px.
export default function Logo({ size = 28 }: { size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/logo.png" alt="UpCreate" style={{ height: size, width: "auto" }} />;
}
