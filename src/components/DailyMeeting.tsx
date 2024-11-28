import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface DailyMeetingProps {
  onClose: () => void;
  onAttend: () => void;
}

export default function DailyMeeting({ onClose, onAttend }: DailyMeetingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-gradient-to-br from-gray-900 to-indigo-900 p-8 rounded-xl max-w-2xl w-full mx-4 shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-white">Daily Meeting</h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
            <video
              src="https://d1yei2z3i6k35z.cloudfront.net/7729991/66b9cdb3474a2_videoacceuil3.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-gray-300">
            It's time for the famous daily meeting that falls at the wrong time! You can visit Ada's website and collect your reward (or not)
          </p>

          <div className="flex gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAttend();
              }}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg flex items-center justify-center gap-2 text-white font-medium transition-colors"
            >
              <ExternalLink size={20} />
              Participate (+500 €)
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="flex-1 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg text-white font-medium transition-colors"
            >
              I hate daily meetings
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}