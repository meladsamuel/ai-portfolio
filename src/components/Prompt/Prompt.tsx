import { ArrowUp } from 'lucide-react';
import VerticalResizable from '@/components/VerticalResizable';


function Prompt() {
  return (
    <div className="fixed w-full bottom-0 px-4 pb-2 md:pb-8">
      <VerticalResizable
          initialHeight={120}
          minHeight={120}
          className="max-w-screen-lg w-full mx-auto"
          handleClassName="w-12 h-2.5 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 rounded-2xl hover:bg-gray-300"
        >
        <div className=" border-1 size-full bg-white/35 backdrop-blur-sm border-gray-200 focus:border-gray-300 shadow-2xl flex flex-col justify-between rounded-2xl overflow-hidden">
          <textarea
            placeholder="Ask anything..."
            className="size-full p-4 text-xl resize-none outline-0 "/>
          <div className="flex justify-between items-center p-2 w-full border-t border-gray-200 text-gray-500">
            <div className="space-x-2">
            <span className="border rounded-2xl py-1.5 px-2 text-sm border-gray-200 hover:bg-gray-100 cursor-pointer">
              Build Website
            </span>
            <span className="border rounded-2xl py-1.5 px-2 text-sm border-gray-200 hover:bg-gray-100 cursor-pointer">
              Schedule an Appointment
            </span>
            </div>
            <button
              type="submit"
              className="bg-black text-white p-2 rounded-full disabled:opacity-50"
            >
              <ArrowUp />
            </button>
          </div>
        </div>
      </VerticalResizable>
    </div>
  );
}

export default Prompt;
