import Typewriter from 'typewriter-effect';
import Prompt from '@/components/Prompt';
import HeroAvatar from '@/components/HeroAvatar';
import AnimatedBackground from '@/components/AnimatedBackground';

function Home() {
  const typeWriterHandler = (typewriter) => {
    typewriter.typeString("<span class='text-2xl md:text-4xl'>Hi, My name is <span class='text-rose-500'>Melad Samuel</span></span><br />")
    .pauseFor(1500)
    .typeString("<span class='text-2xl md:text-4xl'>I'm <span class='text-blue-500'>a DevOps Engineer 🚀</span></span>")
    .pauseFor(1200)
    .deleteChars(20)
    .typeString("<span class='text-orange-400 text-xl md:text-4xl'> a Cloud Enthusiast ☁️</span>")
    .pauseFor(1200)
    .deleteChars(21)
    .typeString("<span class='text-blue-400 text-xl md:text-4xl'> a Kubernetes Expert 🐳</span>")
    .pauseFor(1200)
    .deleteChars(22)
    .typeString("<span class='text-green-500 text-xl md:text-4xl'> an AI Integrator 🤖</span><br />")
    .pauseFor(1200)
    .typeString("You can build your website using AI — just enter a prompt 🤖 <br />")
    .pauseFor(1200)
    .typeString("Need more details? Schedule a meeting with me instantly 📅 <br />")
    .pauseFor(1200)
    .typeString("Get personalized advice and start building your dream site today! 🚀<br />")
    .pauseFor(5000)
    .start();
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-12 items-center justify-center pt-24 px-4 overflow-hidden">
      <HeroAvatar />
      <div className="text-center text-lg md:text-xl text-gray-800">
        <Typewriter
          onInit={typeWriterHandler}
          options={{cursor: "_", delay: '50', deleteSpeed: '50', loop: true}}
        />
      </div>
      <AnimatedBackground />
    </div>
  )
}

export default Home
