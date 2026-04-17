"use client"

import { useState, useEffect, useCallback } from "react"

const properties = [
  {
    location: "Rajajinagar, Bangalore",
    amenities: ["3 BHK", "Furnished", "3 Bathrooms", "3 Balconies"],
    actual_price: "₹2.5 Lac"
  },
  {
    location: "Binny Pete, Bangalore",
    amenities: ["2 BHK", "Semi-Furnished", "2 Bathrooms", "1 Balcony"],
    actual_price: "₹55,000"
  },
  {
    location: "Whitefield, Bangalore",
    amenities: ["5 BHK", "Semi-Furnished", "5 Bathrooms", "3 Balconies"],
    actual_price: "₹4.5 Lac"
  },
  {
    location: "Hebbal, Bangalore",
    amenities: ["3 BHK", "Semi-Furnished", "3 Bathrooms", "2 Balconies"],
    actual_price: "₹70,000"
  },
  {
    location: "Lavelle Road, Bangalore",
    amenities: ["2 BHK", "Furnished", "2 Bathrooms", "4 Balconies"],
    actual_price: "₹2.7 Lac"
  },
  {
    location: "Whitefield, Bangalore",
    amenities: ["4 BHK", "Semi-Furnished", "5 Bathrooms", "4 Balconies"],
    actual_price: "₹1.4 Lac"
  },
  {
    location: "Hebbal, Bangalore",
    amenities: ["3 BHK", "Semi-Furnished", "3 Bathrooms", "2 Balconies"],
    actual_price: "₹85,000"
  },
  {
    location: "Whitefield, Bangalore",
    amenities: ["3 BHK", "Semi-Furnished", "3 Bathrooms", "2 Balconies"],
    actual_price: "₹60,000"
  },
  {
    location: "Kanakapura Road, Bangalore",
    amenities: ["3 BHK", "Semi-Furnished", "3 Bathrooms", "1 Balcony"],
    actual_price: "₹65,000"
  },
  {
    location: "Bannerghatta Main Road, Bangalore",
    amenities: ["3 BHK", "Semi-Furnished", "4 Bathrooms", "2 Balconies"],
    actual_price: "₹1.3 Lac"
  },
  {
    location: "Kothanur, Bangalore",
    amenities: ["4 BHK", "Semi-Furnished", "5 Bathrooms", "3 Balconies"],
    actual_price: "₹1.1 Lac"
  },
  {
    location: "Huvinayakanahalli, Bangalore",
    amenities: ["2 BHK", "Semi-Furnished", "2 Bathrooms", "2 Balconies"],
    actual_price: "₹21,000"
  },
  {
    location: "Whitefield, Bangalore",
    amenities: ["4 BHK", "Semi-Furnished", "4 Bathrooms", "2 Balconies"],
    actual_price: "₹2.5 Lac"
  },
  {
    location: "Cunningham Road, Bangalore",
    amenities: ["2 BHK", "Furnished", "2 Bathrooms", "1 Balcony"],
    actual_price: "₹70,000"
  },
  {
    location: "Manayata Tech Park, Bangalore",
    amenities: ["2 BHK", "Unfurnished", "2 Bathrooms", "2 Balconies"],
    actual_price: "₹37,000"
  },
  {
    location: "Malleshwaram, Bangalore",
    amenities: ["3 BHK", "Semi-Furnished", "3 Bathrooms", "3 Balconies"],
    actual_price: "₹77,000"
  },
  {
    location: "Arekere, Bangalore",
    amenities: ["3 BHK", "Semi-Furnished", "3 Bathrooms", "2 Balconies"],
    actual_price: "₹73,000"
  },
  {
    location: "Koramangala, Bangalore",
    amenities: ["2 BHK", "Furnished", "2 Bathrooms", "2 Balconies"],
    actual_price: "₹1.4 Lac"
  }
]

const roasts = [
  "The landlord also wants your firstborn and a kidney for the deposit! 🏠💀",
  "You thought this was expensive? Wait till you hear about the 10-month advance! 😱",
  "Silk Board traffic has more predictable patterns than Bengaluru rents! 🚗",
  "Even autorickshaw meters are more honest than this rental market! 🛺",
  "The broker is already planning their Goa trip with your brokerage fee! 🏖️",
  "Your water supply will be as unpredictable as your rent guess! 💧",
  "At least the power cuts are free... unlike everything else here! ⚡",
  "The landlord said no pets, no cooking, no guests, and no happiness! 🚫",
  "Plot twist: The maintenance charges are extra! Always extra! 💸",
  "Better luck next time! Maybe try guessing BMTC bus timings instead! 🚌"
]

const wins = [
  "You survived Bengaluru&apos;s rental jungle! The brokers fear you! 🦁",
  "Amazing! You must have a PhD in Bengaluru Real Estate! 🎓",
  "Incredible! Even NoBroker would hire you! 💼",
  "You cracked the code! Time to become a rental consultant! 📊",
  "Brilliant! You&apos;ve earned your filter coffee today! ☕"
]

function parsePrice(priceStr: string): number {
  const cleaned = priceStr.replace(/[₹,\s]/g, "").toLowerCase()
  if (cleaned.includes("lac")) {
    const num = parseFloat(cleaned.replace("lac", ""))
    return num * 100000
  }
  return parseFloat(cleaned)
}

function formatPrice(value: number): string {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)} Lac`
  }
  return `₹${value.toLocaleString("en-IN")}`
}

export function GuessTheRentGame() {
  const [currentProperty, setCurrentProperty] = useState(properties[0])
  const [guess, setGuess] = useState(100000)
  const [hasGuessed, setHasGuessed] = useState(false)
  const [isWin, setIsWin] = useState(false)
  const [message, setMessage] = useState("")
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [usedIndices, setUsedIndices] = useState<number[]>([])

  const selectRandomProperty = useCallback(() => {
    let availableIndices = properties
      .map((_, i) => i)
      .filter((i) => !usedIndices.includes(i))

    if (availableIndices.length === 0) {
      setUsedIndices([])
      availableIndices = properties.map((_, i) => i)
    }

    const randomIndex =
      availableIndices[Math.floor(Math.random() * availableIndices.length)]
    setUsedIndices((prev) => [...prev, randomIndex])
    setCurrentProperty(properties[randomIndex])
  }, [usedIndices])

  useEffect(() => {
    selectRandomProperty()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleGuess = () => {
    const actualPrice = parsePrice(currentProperty.actual_price)
    const difference = Math.abs(guess - actualPrice)
    const percentOff = (difference / actualPrice) * 100

    setHasGuessed(true)

    if (percentOff <= 15) {
      setIsWin(true)
      setScore((prev) => prev + 100)
      setMessage(wins[Math.floor(Math.random() * wins.length)])
    } else {
      setIsWin(false)
      setMessage(roasts[Math.floor(Math.random() * roasts.length)])
    }
  }

  const handleNextLevel = () => {
    setHasGuessed(false)
    setIsWin(false)
    setMessage("")
    setGuess(100000)
    setLevel((prev) => prev + 1)
    selectRandomProperty()
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-[family-name:var(--font-press-start)] text-lg md:text-2xl neon-text-cyan mb-2 leading-relaxed">
          GUESS THE RENT
        </h1>
        <p className="font-[family-name:var(--font-vt323)] text-2xl md:text-3xl neon-text-magenta">
          BENGALURU EDITION
        </p>
      </div>

      {/* Score Board */}
      <div className="flex gap-8 mb-8 font-[family-name:var(--font-press-start)] text-xs">
        <div className="arcade-border px-4 py-2">
          <span className="text-muted-foreground">LEVEL</span>
          <span className="neon-text-yellow ml-2">{level}</span>
        </div>
        <div className="arcade-border px-4 py-2">
          <span className="text-muted-foreground">SCORE</span>
          <span className="neon-text-green ml-2">{score}</span>
        </div>
      </div>

      {/* Game Board */}
      <div className="w-full max-w-xl arcade-border p-6 md:p-8 bg-card">
        {/* Location */}
        <div className="text-center mb-6">
          <p className="font-[family-name:var(--font-press-start)] text-[10px] text-muted-foreground mb-2">
            LOCATION
          </p>
          <h2 className="font-[family-name:var(--font-vt323)] text-3xl md:text-4xl neon-text-cyan animate-flicker">
            {currentProperty.location.replace(", Bangalore", "")}
          </h2>
        </div>

        {/* Amenities */}
        <div className="mb-8">
          <p className="font-[family-name:var(--font-press-start)] text-[10px] text-muted-foreground mb-3 text-center">
            INVENTORY
          </p>
          <div className="grid grid-cols-2 gap-2">
            {currentProperty.amenities.map((amenity, index) => (
              <div
                key={index}
                className="font-[family-name:var(--font-vt323)] text-xl md:text-2xl text-neon-magenta flex items-center gap-2"
              >
                <span className="text-neon-green">{">"}</span>
                {amenity}
              </div>
            ))}
          </div>
        </div>

        {!hasGuessed ? (
          <>
            {/* Slider */}
            <div className="mb-6">
              <p className="font-[family-name:var(--font-press-start)] text-[10px] text-muted-foreground mb-4 text-center">
                YOUR GUESS
              </p>
              <div className="font-[family-name:var(--font-vt323)] text-4xl md:text-5xl neon-text-yellow text-center mb-4 animate-glow-pulse">
                {formatPrice(guess)}
              </div>
              <input
                type="range"
                min="10000"
                max="500000"
                step="5000"
                value={guess}
                onChange={(e) => setGuess(Number(e.target.value))}
                className="w-full h-4 appearance-none bg-muted rounded cursor-pointer 
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:w-6 
                  [&::-webkit-slider-thumb]:h-6 
                  [&::-webkit-slider-thumb]:bg-neon-cyan 
                  [&::-webkit-slider-thumb]:rounded 
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:shadow-[0_0_10px_var(--neon-cyan)]
                  [&::-moz-range-thumb]:w-6 
                  [&::-moz-range-thumb]:h-6 
                  [&::-moz-range-thumb]:bg-neon-cyan 
                  [&::-moz-range-thumb]:rounded 
                  [&::-moz-range-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:border-0"
              />
              <div className="flex justify-between font-[family-name:var(--font-vt323)] text-lg text-muted-foreground mt-2">
                <span>₹10,000</span>
                <span>₹5,00,000</span>
              </div>
            </div>

            {/* Lock In Button */}
            <button
              onClick={handleGuess}
              className="w-full font-[family-name:var(--font-press-start)] text-sm md:text-base py-4 px-6 
                bg-neon-magenta text-background rounded
                hover:scale-105 hover:shadow-[0_0_20px_var(--neon-magenta)] 
                active:scale-95 transition-all duration-150
                border-b-4 border-r-4 border-[rgba(0,0,0,0.3)]"
            >
              🎰 LOCK IN GUESS 🎰
            </button>
          </>
        ) : (
          <>
            {/* Result */}
            <div className="text-center mb-6">
              <p className="font-[family-name:var(--font-press-start)] text-[10px] text-muted-foreground mb-2">
                ACTUAL RENT
              </p>
              <div
                className={`font-[family-name:var(--font-vt323)] text-5xl md:text-6xl animate-flash ${
                  isWin ? "neon-text-green" : "neon-text-red"
                }`}
              >
                {currentProperty.actual_price}
              </div>
            </div>

            {/* Win/Lose Message */}
            <div className="text-center mb-6">
              <p
                className={`font-[family-name:var(--font-press-start)] text-lg md:text-xl mb-4 ${
                  isWin ? "neon-text-green animate-glow-pulse" : "neon-text-red"
                }`}
              >
                {isWin ? "🎉 YOU WIN! 🎉" : "💀 GAME OVER 💀"}
              </p>
              <p className="font-[family-name:var(--font-vt323)] text-xl md:text-2xl text-foreground leading-relaxed">
                {message}
              </p>
              <p className="font-[family-name:var(--font-vt323)] text-lg text-muted-foreground mt-2">
                Your guess: {formatPrice(guess)}
              </p>
            </div>

            {/* Next Level Button */}
            <button
              onClick={handleNextLevel}
              className="w-full font-[family-name:var(--font-press-start)] text-sm md:text-base py-4 px-6 
                bg-neon-green text-background rounded
                hover:scale-105 hover:shadow-[0_0_20px_var(--neon-green)] 
                active:scale-95 transition-all duration-150
                border-b-4 border-r-4 border-[rgba(0,0,0,0.3)]"
            >
              🕹️ NEXT LEVEL (PRESS START) 🕹️
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <p className="font-[family-name:var(--font-vt323)] text-lg text-muted-foreground mt-8 text-center">
        INSERT COIN TO CONTINUE... OR JUST MOVE TO ELECTRONIC CITY 🏃
      </p>
    </div>
  )
}
