import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface Page5Props {
  onNext: () => void;
}

const Page5: React.FC<Page5Props> = ({ onNext }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [showInstructionButton, setShowInstructionButton] = useState(true);
  const [showNextButton, setShowNextButton] = useState(false);

  // Update button visibility based on slider value
  useEffect(() => {
    if (sliderValue === 10) {
      setShowInstructionButton(false);
      setShowNextButton(true);
    } else {
      setShowInstructionButton(true);
      setShowNextButton(false);
    }
  }, [sliderValue]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);
  };

  const moveSliderToMax = () => {
    setSliderValue(10);
  };

  const renderBlocks = () => {
    const blocks = [];
    for (let i = 0; i < sliderValue; i++) {
      blocks.push(
        <div key={i} className="flex gap-1 bg-blue-100 p-2 rounded-lg border-2 border-blue-300">
          <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">1</div>
          <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">1</div>
        </div>
      );
    }
    return blocks;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-blue-500 p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Interactive Multiplication Explorer</h1>
          <div className="bg-green-100 border-2 border-green-400 rounded-2xl p-6 relative">
            <p className="text-xl text-gray-700">Use the slider to explore multiplication by 2!</p>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-400"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-8">
          {/* Equation Display */}
          <div className="text-6xl font-bold text-gray-800 text-center">
            2 × {sliderValue} = {2 * sliderValue}
          </div>

          {/* Slider */}
          <div className="w-full max-w-md">
            <input
              type="range"
              min="0"
              max="10"
              value={sliderValue}
              onChange={handleSliderChange}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #4CAF50 0%, #4CAF50 ${sliderValue * 10}%, #ddd ${sliderValue * 10}%, #ddd 100%)`
              }}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>

          {/* Blocks Display */}
          <div className="min-h-[200px] flex flex-wrap gap-4 justify-center items-center p-4 bg-gray-50 rounded-xl w-full">
            {renderBlocks()}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            {showInstructionButton && (
              <button
                onClick={moveSliderToMax}
                disabled={sliderValue === 10}
                className={`px-8 py-4 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  sliderValue === 10
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
                }`}
              >
                Move slider to right-most position
              </button>
            )}
            
            {showNextButton && (
              <button
                onClick={onNext}
                className="px-8 py-4 text-lg font-bold bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-pulse"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const NumberBlocksApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [progress, setProgress] = useState(1);

  const pages = [
    { id: 1, title: "Unit Blocks Introduction" },
    { id: 2, title: "First Rod Formation" },
    { id: 3, title: "Two 2-Unit Rods" },
    { id: 4, title: "Combined 4-Unit Rod" },
    { id: 5, title: "Interactive Slider" },
    { id: 6, title: "Even Number Sequence" },
    { id: 7, title: "Multiples Display" },
    { id: 8, title: "Celebration" }
  ];

  const handleNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
      setProgress(Math.max(progress, currentPage + 1));
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNum: number) => {
    if (pageNum <= progress) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500">
      {/* Header */}
      <div className="bg-green-500 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Number Blocks - Learning Multiplication</h1>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-100 p-4 flex justify-center">
        <div className="flex space-x-2">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => goToPage(page.id)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                page.id === currentPage
                  ? 'bg-green-500 scale-125'
                  : page.id <= progress
                  ? 'bg-green-300 hover:bg-green-400 cursor-pointer'
                  : 'bg-gray-300'
              }`}
              disabled={page.id > progress}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative overflow-hidden">
        {currentPage === 5 && (
          <Page5 onNext={handleNext} />
        )}
        
        {currentPage !== 5 && (
          <div className="flex items-center justify-center min-h-screen p-8">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl w-full text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                {pages[currentPage - 1].title}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                This is page {currentPage} content - implement other pages as needed
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className={`px-6 py-3 rounded-xl font-semibold ${
                    currentPage === 1
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPage === pages.length}
                  className={`px-6 py-3 rounded-xl font-semibold ${
                    currentPage === pages.length
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            currentPage === 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          <span>Previous</span>
        </button>
        
        <div className="text-gray-600 font-semibold">
          Page {currentPage} of {pages.length}
        </div>
        
        <button
          onClick={handleNext}
          disabled={currentPage === pages.length}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            currentPage === pages.length
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          <span>Next</span>
        </button>
      </div>
    </div>
  );
};

export default NumberBlocksApp;