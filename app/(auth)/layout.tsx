export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel - branding */}
      <div
        className="hidden lg:flex flex-col w-1/2 p-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        }}
      >
        <div className="flex items-center gap-2 z-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF385C] to-[#E61E4D] flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="text-xl font-bold text-white">StayLux</span>
        </div>

        <div className="flex-1 flex flex-col justify-center z-10">
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Your next
            <br />
            <span className="bg-gradient-to-r from-[#FF385C] to-[#ff8fa0] bg-clip-text text-transparent">
              extraordinary
            </span>
            <br />
            stay awaits.
          </h2>
          <p className="text-white/60 text-lg max-w-sm">
            Join millions of travelers discovering amazing properties around the
            world with StayLux.
          </p>

          <div className="flex flex-wrap gap-6 mt-10 text-sm text-white/50">
            <span>✨ 2M+ properties</span>
            <span>🌍 190+ countries</span>
            <span>⭐ 4.9 avg rating</span>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border border-white/5" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full border border-white/10" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-primary/5" />
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
