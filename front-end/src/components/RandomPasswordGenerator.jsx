import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, Copy } from 'lucide-react';

const RandomPasswordGenerator = ({ setPassword }) => {
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);

  const generatePassword = () => {
    const length = 12;

    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    const allChars = lowercase + uppercase + numbers + special;

    let passwordArray = [
      lowercase[Math.floor(Math.random() * lowercase.length)],
      uppercase[Math.floor(Math.random() * uppercase.length)],
      numbers[Math.floor(Math.random() * numbers.length)],
      special[Math.floor(Math.random() * special.length)],
    ];

    // Fill remaining characters
    const remainingLength = length - passwordArray.length;
    const array = new Uint32Array(remainingLength);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < remainingLength; i++) {
      passwordArray.push(allChars[array[i] % allChars.length]);
    }

    // Shuffle
    for (let i = passwordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }

    const finalPassword = passwordArray.join('');
    setGeneratedPassword(finalPassword);
    setPassword(finalPassword);

    // Trigger spin
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 600); // match duration below
  };

  const copyToClipboard = () => {
    if (!generatedPassword) return;
    navigator.clipboard.writeText(generatedPassword);
    alert("Password copied to clipboard!");
  };

  return (
    <div className="flex items-center justify-between mt-3 bg-gray-800 bg-opacity-50 p-2 rounded-lg">
      <button
        type="button"
        onClick={generatePassword}
        className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
      >
        <motion.div
          animate={isSpinning ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <RefreshCcw size={16} />
        </motion.div>
        Generate Strong Password
      </button>

      <button
        type="button"
        onClick={copyToClipboard}
        className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
        disabled={!generatedPassword}
      >
        <Copy size={16} /> Copy
      </button>
    </div>
  );
};

export default RandomPasswordGenerator;
