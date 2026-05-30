// src/pages/Contact.jsx

import emailjs from "@emailjs/browser";
import { useRef, useMemo } from "react";
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function Contact({ lang }) {
  const form = useRef();

  const STARS = 180;

  const stars = useMemo(() => {
    return [...Array(STARS)].map((_, i) => ({
      id: i,
      size: Math.random() > 0.5 ? 2 : 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: 0.3 + Math.random() * 0.7
    }));
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
     const lastSent = localStorage.getItem("lastSentTime");

  if (lastSent) {

    const diff = Date.now() - Number(lastSent);

    if (diff < 60000) {

      alert(
        lang === "ar"
          ? "انتظر دقيقة قبل إرسال رسالة جديدة"
          : "Please wait before sending another message."
      );

      return;
    }
  }

    emailjs
      .sendForm(
        "service_eumpezh",
        "template_pdfgab5",
        form.current,
        "YSEhkWRqjmlqYk6Y-"
      )
      .then(
        () => {
          localStorage.setItem("lastSentTime", Date.now());
          alert(lang === "ar" ? "تم إرسال الرسالة بنجاح 🚀" : "Message sent successfully 🚀");
          form.current.reset();
        },
        () => {
          alert(lang === "ar" ? "فشل الإرسال ❌" : "Failed ❌");
        }
      );
  };

  return (
    <div className={lang === "ar" ? "font-['Cairo']" : ""}>
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 50% 35%, rgba(139,92,246,0.35), transparent 55%),
              linear-gradient(to bottom, #050b26 0%, #0b0f3a 40%, #1e1b4b 70%, #3b0764 100%)
            `
          }}
        />

        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute block rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: star.opacity
            }}
          />
        ))}

        {/* 🌠 Shooting Stars */}

<div
  className="shooting-star absolute"
  style={{
    top: "10%",
    left: "5%",
    animationDelay: "0s"
  }}
/>

<div
  className="shooting-star absolute"
  style={{
    top: "40%",
    left: "35%",
    animationDelay: "10s"
  }}
/>

<div
  className="shooting-star absolute"
  style={{
    top: "70%",
    left: "60%",
    animationDelay: "20s"
  }}
/>
      </div>

      <section className="relative min-h-screen text-white z-10 pb-32 md:pb-40" dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="flex flex-col items-center text-center pt-40 px-4">

          <h1
            className={`
              font-extrabold mb-4
              ${lang === "ar"
                ? "font-['Cairo'] text-[32px] sm:text-[42px] md:text-[80px]"
                : "text-[28px] sm:text-[36px] md:text-[64px]"
              }
            `}
          >
            {lang === "ar" ? "تواصل معي" : "Get in Touch"}
          </h1>

          <p
            className={`
              text-purple-300 mt-4 mb-16 max-w-2xl
              ${lang === "ar"
                ? "text-sm md:text-lg"
                : "text-xs md:text-sm"
              }
            `}
          >
            {lang === "ar" 
              ? "يسعدني تواصلكم لأي استفسارات أو فرص مهنية." 
              : "Feel free to get in touch for any professional inquiries."}
          </p>

          {/* ===== FORM ===== */}
          <form
            ref={form}
            onSubmit={sendEmail}
            className="w-[90%] md:w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.6)]"
          >
            <h2 className="text-base md:text-xl font-semibold mb-6">
              {lang === "ar" ? "أرسل رسالة" : "Contact Me"}
            </h2>

            <input
              type="text"
              name="name"
               maxLength={50}
              placeholder={lang === "ar" ? "الاسم" : "Your Name"}
              required
              className="w-full mb-4 p-3 rounded-lg bg-white/10 border border-white/10 focus:border-purple-500 outline-none transition-all"
            />

            <input
              type="email"
              name="email"
              maxLength={100}
              placeholder={lang === "ar" ? "البريد الإلكتروني" : "Your Email"}
              required
              className="w-full mb-4 p-3 rounded-lg bg-white/10 border border-white/10 focus:border-purple-500 outline-none transition-all"
            />

            <textarea
              name="message"
              maxLength={500}
              placeholder={lang === "ar" ? "رسالتك" : "Your Message"}
              required
              rows="4"
              className="w-full mb-6 p-3 rounded-lg bg-white/10 border border-white/10 focus:border-purple-500 outline-none transition-all"
            />

            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform">
              {lang === "ar" ? "إرسال الرسالة" : "Send Message"}
            </button>
          </form>

          <div className="flex gap-8 mt-12 text-2xl">
            <a 
              href="mailto:ryamalmousa554@gmail.com?subject=Contact%20Request&body=Hello%20Ryam,%0A%0AI%20would%20like%20to%20contact%20you..."
              className="hover:text-purple-400 transition-colors"
            >
              <FaEnvelope />
            </a>

            <a href="https://www.linkedin.com/in/ryam-almousa-a10101276" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">
              <FaLinkedin />
            </a>

            <a href="https://github.com/Ryam-Almousa" target="_blank" rel="noreferrer" className="hover:text-gray-400 transition-colors">
              <FaGithub />
            </a>

            <a href="https://api.whatsapp.com/send?phone=966552589755" target="_blank" rel="noreferrer" className="hover:text-green-400 transition-colors">
              <FaWhatsapp />
            </a>
          </div>

        </div>
      </section>
      <style>
{`
.shooting-star {
  position: absolute;

  width: 3px;
  height: 120px;

  background: linear-gradient(
    to top,
    white,
    rgba(255,255,255,0.6),
    transparent
  );

  filter: blur(1px);

  transform: rotate(45deg);

  opacity: 0;

  animation: shooting 30s linear infinite;
}

@keyframes shooting {

  0% {
    transform: translate(0px, 0px) rotate(45deg);
    opacity: 0;
  }

  2% {
    opacity: 1;
  }

  6% {
    transform: translate(600px, -400px) rotate(45deg);
    opacity: 0;
  }

  100% {
    transform: translate(600px, -400px) rotate(45deg);
    opacity: 0;
  }
}
`}
</style>
    </div>
    

  );
}