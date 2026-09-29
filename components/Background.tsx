export default function Background() {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-canvas" />
      <div aria-hidden className="grain z-grain" />
    </>
  );
}
