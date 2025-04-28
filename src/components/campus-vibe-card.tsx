import { Button } from "@/components/ui/button";

export function CampusVibeCard() {
  return (
    <div className="w-full h-full bg-black text-white flex flex-col items-center justify-center px-4 py-6 aspect-video">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border-2 border-white" />
        </div>
        <h2 className="text-2xl font-bold">Campus Vibe</h2>
      </div>

      <div className="text-center mb-8 max-w-md">
        <p className="text-lg">
          Meet new people on your campus. Anonymous, real-time text & video chat—just like{" "}
          <span className="text-gray-300">Omegle</span>, but made
          for <span className="text-gray-300">students</span>.
        </p>
      </div>

      <Button
        className="rounded-full px-8 py-6 bg-blue-500 hover:bg-blue-600 text-white font-medium text-lg"
      >
        Start Chatting
      </Button>

      <p className="text-gray-400 text-sm mt-8">
        Completely anonymous, no sign-ups, no tracking.
        <br />
        Built with Neetil.
      </p>
    </div>
  );
}
