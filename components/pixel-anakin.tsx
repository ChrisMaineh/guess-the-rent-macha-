"use client"

interface PixelAnakinProps {
  state: "playing" | "win" | "lose"
}

export function PixelAnakin({ state }: PixelAnakinProps) {
  const getContainerAnimation = () => {
    if (state === "playing") return "animate-run-across"
    return ""
  }

  const getCharacterAnimation = () => {
    switch (state) {
      case "playing":
        return "animate-bob"
      case "win":
        return "animate-happy-jump"
      case "lose":
        return "animate-sad-shake"
      default:
        return ""
    }
  }

  const getLightsaberClass = () => {
    switch (state) {
      case "playing":
        return "lightsaber-green"
      case "win":
        return "lightsaber-blue"
      case "lose":
        return "lightsaber-red"
      default:
        return "lightsaber-green"
    }
  }

  const getHeadRotation = () => {
    if (state === "lose") return "rotate-[15deg] translate-y-[2px]"
    return ""
  }

  return (
    <div className="fixed bottom-8 left-0 w-full h-16 pointer-events-none z-40 overflow-hidden">
      <div className={`${getContainerAnimation()}`}>
        <div className={`relative ${getCharacterAnimation()}`}>
          {/* 8-bit Anakin Character */}
          <div className="relative w-12 h-14">
            {/* Hair */}
            <div className="absolute top-0 left-1 w-10 h-3 bg-amber-900 rounded-t-sm">
              {/* Hair strands */}
              <div className="absolute -left-0.5 top-1 w-1.5 h-3 bg-amber-900 rounded-b-sm" />
              <div className="absolute -right-0.5 top-1 w-1.5 h-3 bg-amber-900 rounded-b-sm" />
            </div>
            
            {/* Head */}
            <div className={`absolute top-2 left-2 w-8 h-6 bg-amber-200 rounded-sm transition-transform ${getHeadRotation()}`}>
              {/* Eyes */}
              <div className="absolute top-2 left-1 w-1.5 h-1.5 bg-sky-600 rounded-sm" />
              <div className="absolute top-2 right-1 w-1.5 h-1.5 bg-sky-600 rounded-sm" />
              {/* Mouth - changes based on state */}
              {state === "win" && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-amber-800 rounded-full" />
              )}
              {state === "lose" && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-amber-800 rounded-t-full transform rotate-180" />
              )}
              {state === "playing" && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-800 rounded-full" />
              )}
            </div>
            
            {/* Body / Jedi Robe */}
            <div className="absolute top-7 left-1.5 w-9 h-5 bg-amber-800 rounded-sm">
              {/* Robe detail */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-amber-900" />
              {/* Belt */}
              <div className="absolute bottom-1 left-0 w-full h-1 bg-amber-950" />
            </div>
            
            {/* Arms */}
            <div className="absolute top-8 -left-1 w-2.5 h-3 bg-amber-700 rounded-sm" />
            <div className="absolute top-8 -right-1 w-2.5 h-3 bg-amber-700 rounded-sm">
              {/* Hand holding lightsaber */}
              <div className="absolute top-0 -right-0.5 w-2 h-2 bg-amber-200 rounded-sm" />
            </div>
            
            {/* Legs */}
            <div className="absolute top-[46px] left-2 w-3 h-3 bg-amber-950 rounded-b-sm" />
            <div className="absolute top-[46px] right-2 w-3 h-3 bg-amber-950 rounded-b-sm" />
            
            {/* Lightsaber */}
            <div className="absolute top-3 -right-4 flex flex-col items-center">
              {/* Blade */}
              <div className={`w-1.5 h-10 rounded-full ${getLightsaberClass()}`} />
              {/* Hilt */}
              <div className="w-2 h-3 bg-gray-400 rounded-sm border border-gray-600">
                <div className="w-full h-0.5 bg-gray-600 mt-0.5" />
                <div className="w-full h-0.5 bg-gray-600 mt-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
