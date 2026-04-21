import React, { useEffect, useMemo, useRef, useState } from "react";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import sanaLogo from "./assets/sana-logo.png";
import voiceMp3 from "./assets/voice.mp3";
import {
  BookOpen,
  Building2,
  Crown,
  ExternalLink,
  Eye,
  Globe,
  Headphones,
  HeartHandshake,
  Languages,
  Layers3,
  Link2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mic2,
  MonitorPlay,
  Pause,
  Play,
  Radio,
  RotateCcw,
  Send,
  ShieldCheck,
  SkipBack,
  SkipForward,
  Sparkles,
  Stars,
  Target,
  Users,
  Volume2,
} from "lucide-react";

const ACCENT = "#F7B718";
const CTA_DARK = "#4A1020";

const OUTER_GRADIENT =
  "bg-[linear-gradient(135deg,rgba(74,16,32,0.98)_0%,rgba(0,95,86,0.95)_52%,rgba(223,117,0,0.92)_100%)]";
const INNER_GRADIENT =
  "bg-[linear-gradient(135deg,rgba(74,16,32,0.96)_0%,rgba(0,95,86,0.93)_52%,rgba(223,117,0,0.88)_100%)]";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

const pulseGlow = {
  opacity: [0.2, 0.45, 0.2],
  scale: [1, 1.03, 1],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
};

const containerClass =
  "relative z-10 mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10 xl:px-14";
const glass =
  `border border-[rgba(247,183,24,0.22)] ${OUTER_GRADIENT} md:backdrop-blur-xl backdrop-blur-sm shadow-[0_14px_36px_rgba(0,0,0,0.34)]`;
const softCard = `rounded-[2rem] ${glass}`;
const gradientOuterCard = `rounded-[2rem] border border-[rgba(247,183,24,0.22)] ${OUTER_GRADIENT} md:backdrop-blur-xl backdrop-blur-sm shadow-[0_14px_36px_rgba(0,0,0,0.34)]`;

const navItems = [
  { label: "අපි කවුද", href: "#about" },
  { label: "විශේෂාංග", href: "#features" },
  { label: "අපගේ කෘති", href: "#portfolio" },
  { label: "සාර්ථකත්වයේ හවුල්කරුවන්", href: "#partners" },
  { label: "අප හා සම්බන්ධ වන්න", href: "#contact" },
];

const stats = [
  { value: "+100", label: "ඉලක්කගත ගෝලීය භාෂා" },
  { value: "24/7", label: "නිරන්තර ගෝලීය ප්‍රවේශය" },
  { value: "114", label: "සම්පූර්ණ සූරා" },
  { value: "HQ", label: "උසස් ශ්‍රව්‍ය හා දෘශ්‍ය තත්ත්වය" },
];

const heroCards = [
  { value: "114", label: "සම්පූර්ණ සූරා" },
  { value: "30", label: "අල් කුර්ආනයේ ජුස්" },
  { value: "නිපුණ", label: "ශ්‍රව්‍ය දෘශ්‍ය ඉදිරිපත් කිරීම" },
];

const heroBadges = [
  { icon: Sparkles, title: "අල් කුර්ආනයේ ආලෝකය හා අලංකාරය" },
  { icon: Globe, title: "ලෝකයට පණිවිඩයක්" },
];

const identityCards = [
  {
    icon: Users,
    title: "අපි කවුද",
    text: "සනා යනු අල් කුර්ආනයේ අර්ථයන් ලෝකයට පැමිණවීම අරමුණු කරගත් වක්ෆ් ව්‍යාපෘතියකි. මධුර පාරායණය හා නිවැරදි පරිවර්තනය එක් කරන ශ්‍රව්‍ය හා දෘශ්‍ය නාලිකා හරහා, ලෝකයේ විවිධ භාෂාවලින් දෙවියන්ගේ වචනය හදවත් වෙත සමීප කරන සම්පූර්ණ ආත්මික අත්දැකීමක් අපි ඉදිරිපත් කරමු.",
  },
  {
    icon: Eye,
    title: "දැක්ම",
    text: "අල් කුර්ආනයේ අර්ථයන් සෑම පුද්ගලයෙකුටම ඔහුගේ භාෂාවෙන් පිරිනමන, අලංකාරය, නිපුණත්වය සහ නවීන තාක්ෂණය එකට ගෙන එන ආධුනික ශෛලියකින් යුත් ප්‍රමුඛ ගෝලීය වේදිකාවක් වීම.",
  },
  {
    icon: Target,
    title: "මෙහෙවර",
    text: "පැහැදිලිව සහ පහසුවෙන් අල් කුර්ආනයේ අර්ථයන් තේරුම් ගැනීමට ඉඩ සලසන, පරිවර්තනය කළ ශ්‍රව්‍ය හා දෘශ්‍ය කුර්ආනීය අන්තර්ගතය ඉදිරිපත් කරමින්, මගපෙන්වීම පැතිරවීමට සහ ලෝකයට දෙවියන්ගේ වචනය බලපෑමකින් හා ආකර්ෂණීය ආකාරයෙන් හඳුන්වාදීමට දායක වීම.",
  },
];

const features = [
  {
    icon: Languages,
    title: "බහුභාෂා පරිවර්තන",
    desc: "ජනතාවගේම භාෂාවලින් අල් කුර්ආනයේ අර්ථයන් පැහැදිලිව හා නිවැරදිව, අර්ථය සහ පණිවිඩය සුරකිමින් පිරිනැමීම.",
  },
  {
    icon: Headphones,
    title: "සම්පූර්ණ ශ්‍රව්‍ය හා දෘශ්‍ය අත්දැකීම",
    desc: "බලපෑමක් ඇති පාරායණය හා පරිවර්තනය කළ පාඨය එක් කරන, අල් කුර්ආනයේ ගෞරවයට සුදුසු සන්සුන් අත්දැකීමක්.",
  },
  {
    icon: Globe,
    title: "නිරන්තර ගෝලීය ව්‍යාප්තිය",
    desc: "පැය 24 පුරා විවිධ මහද්වීප හා වේදිකා වෙත ප්‍රවේශ දොරටු විවෘත කරන ඩිජිටල් හා විකාශන පැවැත්ම.",
  },
  {
    icon: HeartHandshake,
    title: "අල්ලාහ් වෙනුවෙන් වූ වක්ෆ් එකක්",
    desc: "එය ප්‍රචාරය කිරීමට, සහය දැක්වීමට හෝ ප්‍රයෝජනයට ගන්නා සෑම අයෙකුම සවභාගි වන ගෝලීය ධර්මප්‍රචාරක පණිවිඩයක්.",
  },
];

const channels = [
  {
    icon: Radio,
    title: "චන්ද්‍රිකා හා ගුවන්විදුලි නාලිකා",
    desc: "විවිධ ජනතාවට ඔවුන්ගේ භාෂාවලින් ළඟා වන ශ්‍රව්‍ය හා දෘශ්‍ය නාලිකා හරහා අල් කුර්ආනයේ අර්ථයන් ප්‍රචාරය කිරීම.",
  },
  {
    icon: MonitorPlay,
    title: "සමාජ මාධ්‍ය වේදිකා සහ වෙබ් අඩවි",
    desc: "කුර්ආනීය අන්තර්ගතයට පහසුවෙන් ළඟා වීමට සහ එය පුළුල් ලෙස ප්‍රචාරය කිරීමට උපකාර කරන නිරන්තරයෙන් අලුත් වන ඩිජිටල් පැවැත්ම.",
  },
  {
    icon: Layers3,
    title: "විවිධ ඩිජිටල් යෙදුම් සහ මාධ්‍ය",
    desc: "විවිධ උපාංග සහ වේදිකාවන්ට ගැළපෙන ආකාරවලින් කුර්ආනීය අන්තර්ගතය අනුගමනය කිරීමට ඉඩ සලසන නවීන හා විවිධ අත්දැකීමක්.",
  },
];

const partners = [
  {
    icon: ShieldCheck,
    title: "ශරීඅත් ආයතන සහ ඉස්ලාමීය සංවිධාන",
    desc: "අල් කුර්ආනයේ අර්ථයන් සඳහා අනුමත පරිවර්තන ලබා දීමෙන් නිවැරදිභාවය හා ශරීඅත් පදනම තහවුරු කළ ආයතන.",
  },
  {
    icon: Mic2,
    title: "මධුර හඬ ඇති බලපෑම්කාර පාරායණකරුවන්",
    desc: "හදවත් වෙත ආදරණීය හා ආකර්ෂණීය ආකාරයෙන් ළඟා වන භක්තිමත් හා බලපෑමකින් යුත් පාරායණයන්ගෙන් ව්‍යාපෘතිය පොහොසත් කළ අය.",
  },
  {
    icon: Headphones,
    title: "ශ්‍රව්‍ය හා තාක්ෂණික නිෂ්පාදන සමාගම්",
    desc: "උසස් තත්ත්වයේ පටිගත කිරීම් සහ වෘත්තීය ශ්‍රව්‍ය හා දෘශ්‍ය සැකසුම් ලබා දුන් සමාගම්.",
  },
  {
    icon: Users,
    title: "නිෂ්පාදකයින් සහ ස්වේච්ඡා සේවකයින්",
    desc: "අන්තර්ගතය සංවර්ධනය කිරීමට සහ එය ලෝකය පුරා හැකි තරම් විශාල පිරිසකට ළඟා කිරීමට දායක වූ අය.",
  },
];

const impactCards = [
  {
    icon: Globe,
    title: "ගෝලීය ප්‍රවේශය",
    desc: "අල් කුර්ආනයේ පණිවිඩය ලෝකයේ විවිධ රටවල නිවෙස් වෙත, මව් භාෂාවෙන් ජනතාවට කතා කරන බහුවිධ භාෂාවලින් ළඟා වී ඇත.",
  },
  {
    icon: Languages,
    title: "විශ්වාසනීය පරිවර්තන",
    desc: "අර්ථයේ නිවැරදිභාවය තහවුරු කිරීම සඳහා විශ්වාසනීය ශාස්ත්‍රීය ආයතනවල අධීක්ෂණය යටතේ අල් කුර්ආනයේ අර්ථයන් සඳහා නිවැරදි පරිවර්තන සපයනු ලැබීය.",
  },
  {
    icon: Headphones,
    title: "සම්පූර්ණ අත්දැකීම",
    desc: "භක්තිමත් පාරායණය හා දෘශ්‍ය පරිවර්තනය එකතු කර, බලපෑමකින් හා පහසුවෙන් තේරුම් ගත හැකි ආත්මික අත්දැකීමක් ලබා දෙන අන්තර්ගතය.",
  },
  {
    icon: Send,
    title: "දිගුවන පණිවිඩය",
    desc: "විවිධ පිරිස් වෙත ළඟා වන ආධුනික ශෛලියකින් මගපෙන්වීම ප්‍රචාරය කිරීමට සහ ලෝකයට දෙවියන්ගේ වචනය හඳුන්වා දීමට මෙම ව්‍යාපෘතිය දායක වේ.",
  },
];

const portfolioVideos = [
  `${import.meta.env.BASE_URL}videos/v1.mp4`,
  `${import.meta.env.BASE_URL}videos/v2.mp4`,
  `${import.meta.env.BASE_URL}videos/v3.mp4`,
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

function sectionBadge(icon, text, textColor = "text-white") {
  const Icon = icon;
  return (
    <div
      className={`inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-semibold ${textColor} backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.14)] sm:px-5 sm:py-3 sm:text-sm`}
    >
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: ACCENT }} />
      <span className="truncate">{text}</span>
    </div>
  );
}

function LargeSectionBadge({ icon: Icon, text }) {
  return (
    <div
      className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-base font-bold backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.14)] sm:px-8 sm:py-4 sm:text-xl lg:text-2xl"
      style={{ color: ACCENT }}
    >
      <Icon className="h-5 w-5 shrink-0 sm:h-7 sm:w-7" style={{ color: ACCENT }} />
      <span className="truncate">{text}</span>
    </div>
  );
}

function AppStoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M9 15.5 14.5 8" />
      <path d="M11 8h4" />
      <path d="M9.5 15.5H15" />
      <path d="M10.5 12h5" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 4.5v15l8.8-7.5L5 4.5Z" />
      <path d="m13.8 12 3.6-3 1.6 1.1c1.2.8 1.2 2.1 0 2.9L17.4 14l-3.6-2Z" />
      <path d="m17.4 9-8.2-3.6" />
      <path d="m17.4 15-8.2 3.6" />
    </svg>
  );
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function HeroAudioPlayer({ isMobile }) {
  const audioRef = useRef(null);
  const blobUrlRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const previousBarsRef = useRef([]);

  const BARS_COUNT = isMobile ? 24 : 48;
  const HALF_BARS = BARS_COUNT / 2;
  const MIN_BAR_HEIGHT = isMobile ? 8 : 10;
  const MAX_BAR_HEIGHT = isMobile ? 22 : 34;

  const idleBars = useMemo(() => {
    const half = Array.from({ length: HALF_BARS }, (_, i) => {
      const t = i / Math.max(1, HALF_BARS - 1);
      return Math.round((isMobile ? 9 : 12) + t * 3);
    });
    return [...half.slice().reverse(), ...half];
  }, [HALF_BARS, isMobile]);

  const [bars, setBars] = useState(idleBars);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    previousBarsRef.current = idleBars;
    setBars(idleBars);
  }, [idleBars]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;

    const loadAudioAsBlob = async () => {
      try {
        const response = await fetch(voiceMp3, { cache: "force-cache" });
        const blob = await response.blob();
        if (cancelled) return;

        const objectUrl = URL.createObjectURL(blob);
        blobUrlRef.current = objectUrl;
        audio.src = objectUrl;
        audio.load();
      } catch {
        if (!cancelled) {
          audio.src = voiceMp3;
          audio.load();
        }
      }
    };

    loadAudioAsBlob();

    return () => {
      cancelled = true;
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      previousBarsRef.current = idleBars;
      setBars(idleBars);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onLoaded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onLoaded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [idleBars]);

  useEffect(() => {
    if (isMobile && !isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);
      return;
    }

    if (!isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const animateBars = () => {
      analyser.getByteFrequencyData(dataArray);

      let total = 0;
      for (let i = 0; i < bufferLength; i += 1) total += dataArray[i];
      const globalEnergy = total / bufferLength / 255;

      const halfBars = Array.from({ length: HALF_BARS }, (_, index) => {
        const start = Math.floor((index / HALF_BARS) * bufferLength);
        const end = Math.floor(((index + 1) / HALF_BARS) * bufferLength);

        let localSum = 0;
        let count = 0;

        for (let i = start; i < end; i += 1) {
          localSum += dataArray[i];
          count += 1;
        }

        const localEnergy = count ? localSum / count / 255 : 0;
        const mixedEnergy = localEnergy * 0.68 + globalEnergy * 0.32;
        const height =
          MIN_BAR_HEIGHT +
          mixedEnergy * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT);

        return clamp(height, MIN_BAR_HEIGHT, MAX_BAR_HEIGHT);
      });

      const mirroredBars = [...halfBars.slice().reverse(), ...halfBars];

      const animatedBars = mirroredBars.map((value, index) => {
        const previous = previousBarsRef.current[index] ?? idleBars[index];
        return Math.round(previous * 0.55 + value * 0.45);
      });

      previousBarsRef.current = animatedBars;
      setBars(animatedBars);
      animationFrameRef.current = requestAnimationFrame(animateBars);
    };

    animationFrameRef.current = requestAnimationFrame(animateBars);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [HALF_BARS, MAX_BAR_HEIGHT, MIN_BAR_HEIGHT, idleBars, isPlaying, isMobile]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const setupAnalyser = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioContextRef.current) {
      const context = new AudioContextClass();
      const analyser = context.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.92;

      const source = context.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(context.destination);

      audioContextRef.current = context;
      analyserRef.current = analyser;
    }

    if (audioContextRef.current?.state === "suspended") {
      await audioContextRef.current.resume().catch(() => {});
    }
  };

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const togglePlay = async () => {
    const el = audioRef.current;
    if (!el) return;

    await setupAnalyser();

    if (el.paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const seekBy = (delta) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(
      0,
      Math.min(el.duration || 0, (el.currentTime || 0) + delta)
    );
  };

  const replay = async () => {
    const el = audioRef.current;
    if (!el) return;
    await setupAnalyser();
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const toggleMute = () => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const handleSeek = (event) => {
    const el = audioRef.current;
    if (!el) return;
    const next = Number(event.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  return (
    <div className="mt-5 rounded-[1.35rem] border border-white/10 bg-[rgba(18,10,12,0.62)] p-3 sm:p-4">
      <audio
        ref={audioRef}
        preload="metadata"
        onContextMenu={(e) => e.preventDefault()}
      />

      <div className="mb-4 flex h-14 items-end gap-[2px] overflow-hidden rounded-2xl border border-white/10 bg-black/10 px-2 py-3 sm:h-18">
        {bars.map((height, index) => (
          <motion.div
            key={index}
            animate={{ height }}
            transition={{ duration: isMobile ? 0.2 : 0.14, ease: "easeOut" }}
            className="flex-1 self-end rounded-full bg-gradient-to-t from-[#941E32] via-[#F7B718] to-[#005F56] opacity-95"
            style={{ maxHeight: `${MAX_BAR_HEIGHT}px` }}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label={isPlaying ? "තාවකාලිකව නවත්වන්න" : "වාදනය කරන්න"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" style={{ color: ACCENT }} />
          ) : (
            <Play className="h-4 w-4" style={{ color: ACCENT }} />
          )}
        </button>

        <button
          type="button"
          onClick={() => seekBy(-10)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="පසුපසට යන්න"
        >
          <SkipBack className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={replay}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="නැවත වාදනය කරන්න"
        >
          <RotateCcw className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={() => seekBy(10)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="ඉදිරියට යන්න"
        >
          <SkipForward className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="ශබ්දය"
        >
          <Volume2
            className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
            style={{ color: ACCENT }}
          />
        </button>

        <div className="min-w-[52px] text-xs text-white/75">
          {formatTime(currentTime)}
        </div>

        <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-white/10">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#941E32] via-[#F7B718] to-[#005F56]"
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="audio-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
            style={{ WebkitAppearance: "none" }}
          />
        </div>
      </div>

      <style>{`
        .audio-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .audio-range::-moz-range-track { height: 8px; background: transparent; }
        .audio-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -3px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .audio-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
      `}</style>
    </div>
  );
}

function StructuredCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${gradientOuterCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(74,16,32,0.92)_0%,rgba(0,95,86,0.88)_52%,rgba(223,117,0,0.84)_100%)] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[rgba(0,95,86,0.22)]">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-base font-bold leading-7 text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-[rgba(18,10,12,0.62)] px-4 py-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function IdentityCard({ icon: Icon, title, text, large = false, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${softCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(74,16,32,0.92)_0%,rgba(0,95,86,0.88)_52%,rgba(223,117,0,0.84)_100%)] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[rgba(0,95,86,0.22)]">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <div
            className={`rounded-2xl border border-white/10 bg-white/5 px-4 py-2 font-bold text-white ${
              large ? "text-lg sm:text-xl" : "text-base sm:text-lg"
            }`}
          >
            {title}
          </div>
        </div>
        <div
          className={`mt-4 rounded-2xl border border-white/10 bg-[rgba(18,10,12,0.62)] px-4 py-4 text-white/80 ${
            large
              ? "text-base leading-8 sm:text-lg sm:leading-9 lg:text-xl lg:leading-10"
              : "text-base leading-8 sm:text-lg"
          }`}
        >
          {text}
        </div>
      </div>
    </motion.div>
  );
}

function ImpactCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${softCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(74,16,32,0.92)_0%,rgba(0,95,86,0.88)_52%,rgba(223,117,0,0.84)_100%)] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[rgba(247,183,24,0.18)]">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-base font-bold text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-[rgba(18,10,12,0.62)] px-4 py-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function ProtectedHlsVideoCard({
  video,
  index,
  isMobile,
  videoId,
  registerVideo,
  unregisterVideo,
  requestExclusivePlay,
}) {
  const videoRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    registerVideo(videoId, element);

    const onLoaded = () => {
      setDuration(element.duration || 0);
      setIsReady(true);
    };

    const onTimeUpdate = () => setCurrentTime(element.currentTime || 0);

    const onPlay = () => {
      requestExclusivePlay(videoId);
      setIsPlaying(true);
    };

    const onPause = () => setIsPlaying(false);

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    element.addEventListener("loadedmetadata", onLoaded);
    element.addEventListener("loadeddata", onLoaded);
    element.addEventListener("canplay", onLoaded);
    element.addEventListener("durationchange", onLoaded);
    element.addEventListener("timeupdate", onTimeUpdate);
    element.addEventListener("play", onPlay);
    element.addEventListener("pause", onPause);
    element.addEventListener("ended", onEnded);

    return () => {
      unregisterVideo(videoId);
      element.removeEventListener("loadedmetadata", onLoaded);
      element.removeEventListener("loadeddata", onLoaded);
      element.removeEventListener("canplay", onLoaded);
      element.removeEventListener("durationchange", onLoaded);
      element.removeEventListener("timeupdate", onTimeUpdate);
      element.removeEventListener("play", onPlay);
      element.removeEventListener("pause", onPause);
      element.removeEventListener("ended", onEnded);
    };
  }, [registerVideo, requestExclusivePlay, unregisterVideo, videoId]);

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const playVideo = () => {
    const el = videoRef.current;
    if (!el) return;

    requestExclusivePlay(videoId);
    el.play().catch(() => {});
  };

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;

    if (el.paused) {
      playVideo();
    } else {
      el.pause();
    }
  };

  const replayVideo = () => {
    const el = videoRef.current;
    if (!el) return;

    requestExclusivePlay(videoId);
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const handleSeek = (e) => {
    const el = videoRef.current;
    if (!el) return;
    const next = Number(e.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    const next = !el.muted;
    el.muted = next;
    setMuted(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 12 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.5, delay: isMobile ? 0 : index * 0.08 }}
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${softCard} p-3 sm:p-4`}
    >
      <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/30">
        <video
          ref={videoRef}
          src={video}
          className="aspect-video w-full object-cover"
          playsInline
          preload="auto"
          controls={false}
          muted={muted}
          onContextMenu={(e) => e.preventDefault()}
        />

        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/15 transition hover:bg-black/10"
            aria-label="වීඩියෝව වාදනය කරන්න"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_0_24px_rgba(247,183,24,0.18)] sm:h-18 sm:w-18">
              <Play className="mr-1 h-7 w-7 text-white" />
            </span>
          </button>
        )}

        <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] text-white/80 backdrop-blur-md">
          {isReady ? "වාදනයට පෙර පෙරදසුන දිස්වේ" : "පෙරදසුන සූදානම් වෙමින් පවතී"}
        </div>
      </div>

      <div className="mt-4 rounded-[1.3rem] border border-white/10 bg-[rgba(18,10,12,0.62)] p-3 sm:p-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={toggleMute}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="ශබ්දය නිශ්ශබ්ද කරන්න හෝ සක්‍රිය කරන්න"
          >
            <Volume2
              className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
              style={{ color: ACCENT }}
            />
          </button>

          <button
            type="button"
            onClick={replayVideo}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="නැවත වාදනය කරන්න"
          >
            <RotateCcw className="h-4 w-4" style={{ color: ACCENT }} />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label={isPlaying ? "තාවකාලිකව නවත්වන්න" : "වාදනය කරන්න"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" style={{ color: ACCENT }} />
            ) : (
              <Play className="h-4 w-4" style={{ color: ACCENT }} />
            )}
          </button>

          <div className="min-w-[52px] text-xs text-white/75">
            {formatTime(currentTime)}
          </div>

          <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-white/10">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#941E32] via-[#F7B718] to-[#005F56]"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="video-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
            />
          </div>
        </div>
      </div>

      <style>{`
        .video-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .video-range::-moz-range-track { height: 8px; background: transparent; }
        .video-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -3px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .video-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
      `}</style>
    </motion.div>
  );
}

export default function QuranTranslationLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const videoElementsRef = useRef({});

  const registerVideo = (videoId, element) => {
    videoElementsRef.current[videoId] = element;
  };

  const unregisterVideo = (videoId) => {
    delete videoElementsRef.current[videoId];
  };

  const requestExclusivePlay = (activeVideoId) => {
    Object.entries(videoElementsRef.current).forEach(([videoId, element]) => {
      if (videoId !== String(activeVideoId) && element && !element.paused) {
        element.pause();
      }
    });
  };

  return (
    <LazyMotion features={domAnimation}>
      <div
        dir="ltr"
        className="relative min-h-screen overflow-hidden bg-transparent text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(247,183,24,0.12),transparent_24%),radial-gradient(circle_at_88%_16%,rgba(0,95,86,0.16),transparent_26%),radial-gradient(circle_at_50%_78%,rgba(116,23,49,0.22),transparent_30%),linear-gradient(180deg,#16060D_0%,#260A16_24%,#3A1020_48%,#0B3F3A_74%,#071E1C_100%)]" />

        {!isMobile && (
          <>
            <motion.div
              className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#F7B718]/18 blur-3xl"
              animate={pulseGlow}
            />
            <div className="absolute inset-0 opacity-[0.06]">
              <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
            </div>
          </>
        )}

        <div className={containerClass}>
          <header className="pt-4 sm:pt-6">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className={`mx-auto flex items-center justify-between gap-3 rounded-[1.5rem] px-3 py-3 sm:rounded-[2rem] sm:px-4 ${glass}`}
            >
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[rgba(247,183,24,0.22)] bg-white/10 shadow-[0_0_24px_rgba(247,183,24,0.22)] sm:h-16 sm:w-16">
                  <img
                    src={sanaLogo}
                    alt="සනා කුරානි නාලිකා ලාංඡනය"
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="truncate text-sm font-bold tracking-wide sm:text-xl">
                  සනා කුරානි නාලිකා
                </div>
              </div>

              <nav className="hidden items-center gap-3 md:flex">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 transition hover:border-[rgba(247,183,24,0.34)] hover:bg-white/10 hover:text-[#F7D779]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </motion.div>

            {menuOpen && (
              <div className={`mt-3 rounded-[1.4rem] p-3 md:hidden sm:rounded-[1.6rem] sm:p-4 ${glass}`}>
                <div className="grid gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 sm:text-base"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </header>

          <section className="relative grid min-h-[auto] items-center gap-10 py-10 sm:gap-12 sm:py-14 lg:min-h-[84vh] lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div className="order-1 lg:order-1">
              <motion.div
                custom={0}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(247,183,24,0.22)] bg-white/10 px-4 py-2 text-xs backdrop-blur-md sm:text-sm"
                style={{ color: ACCENT }}
              >
                <Stars className="h-4 w-4" style={{ color: ACCENT }} />
                <span>සනා... ලෝකයන් වෙත පණිවිඩයක්</span>
              </motion.div>

              <motion.h1
                custom={1}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="text-3xl font-black leading-[1.25] sm:text-5xl lg:text-7xl"
              >
                <span className="block bg-gradient-to-l from-[#F7B718] via-[#FFD978] to-[#DF7500] bg-clip-text text-transparent">
                  සනා කුරානි නාලිකා
                </span>
              </motion.h1>

              <motion.p
                custom={2}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8 lg:text-xl"
              >
                ශ්‍රව්‍ය හා දෘශ්‍ය නාලිකා මඟින් ලෝකයේ සියලුම භාෂාවලට අල් කුර්ආනයේ අර්ථ පරිවර්තන — අල්ලාහ් වෙනුවෙන් වූ වක්ෆ්.
              </motion.p>

              <motion.div
                custom={3}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
              >
                <a
                  href="#features"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl border px-6 py-3.5 text-sm font-bold shadow-[0_8px_20px_rgba(8,8,32,0.24)] transition hover:scale-[1.02] sm:px-7 sm:py-4 sm:text-base"
                  style={{
                    backgroundColor: CTA_DARK,
                    borderColor: "rgba(243,231,179,0.18)",
                    color: ACCENT,
                  }}
                >
                  <Sparkles
                    className="h-5 w-5 transition group-hover:rotate-12"
                    style={{ color: ACCENT }}
                  />
                  වේදිකාව සොයා බලන්න
                </a>

                <a
                  href="https://www.youtube.com/@%E0%B7%83%E0%B6%B1%E0%B7%8F.%E0%B7%83%E0%B7%92%E0%B6%82%E0%B7%84%E0%B6%BD"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15 sm:px-7 sm:py-4 sm:text-base"
                >
                  <Play className="h-5 w-5" />
                  අපගේ නාලිකාවට පිවිසෙන්න
                </a>
              </motion.div>

              <motion.div
                custom={4}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4"
              >
                {stats.map((item, i) => (
                  <motion.div
                    key={item.label}
                    animate={isMobile ? {} : { y: [0, -4, 0] }}
                    transition={
                      isMobile
                        ? {}
                        : {
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                    className="rounded-3xl border border-white/10 bg-white/10 p-3 text-center backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:p-4"
                  >
                    <div className="text-xl font-black sm:text-2xl" style={{ color: ACCENT }}>
                      {item.value}
                    </div>
                    <div className="mt-2 text-xs text-white/70 sm:text-sm">{item.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, rotate: isMobile ? 0 : -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 relative lg:order-2"
            >
              <motion.div
                animate={isMobile ? {} : { y: [0, -10, 0] }}
                transition={isMobile ? {} : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className={`relative mx-auto max-w-2xl p-3 sm:p-4 ${softCard}`}
              >
                <div className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(135deg,rgba(74,16,32,0.86)_0%,rgba(0,95,86,0.82)_52%,rgba(223,117,0,0.76)_100%)] p-4 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs text-white/60 sm:text-sm">වත්මන් භාෂාව</p>
                      <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                        සිංහල භාෂාවෙන් අල් කුර්ආනය
                      </h3>
                    </div>
                    <div className="w-fit rounded-2xl border border-[rgba(247,183,24,0.24)] bg-[rgba(0,95,86,0.28)] px-4 py-2 text-xs text-[#F7D779] sm:text-sm">
                      සජීවී විකාශනය
                    </div>
                  </div>

                  <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-[rgba(24,12,16,0.72)] p-4 sm:mt-8 sm:p-6">
                    <div className="mb-4 flex items-start gap-3 text-sm text-white/80 sm:items-center sm:text-base">
                      <Headphones className="mt-0.5 h-5 w-5 shrink-0 text-[#F7D779] sm:mt-0" />
                      <span>අල් කුර්ආනයේ අර්ථයන්ගේ දෘශ්‍ය ඉදිරිපත් කිරීම සමඟ පාරායණය ශ්‍රවණය කරන්න</span>
                    </div>

                    {!isMobile && (
                      <div className="space-y-3">
                        {[65, 88, 42].map((w, idx) => (
                          <motion.div
                            key={idx}
                            animate={{ width: [`${w - 14}%`, `${w}%`, `${w - 8}%`] }}
                            transition={{
                              duration: 3 + idx,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="h-3 rounded-full bg-gradient-to-r from-[#941E32] via-[#F7B718] to-[#005F56]"
                          />
                        ))}
                      </div>
                    )}

                    <div className="mt-6 grid grid-cols-3 gap-2 text-center sm:mt-8 sm:gap-3">
                      {heroCards.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4"
                        >
                          <div className="text-sm font-bold sm:text-lg" style={{ color: ACCENT }}>
                            {item.value}
                          </div>
                          <div className="mt-1 text-[11px] text-white/60 sm:text-xs">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <HeroAudioPlayer isMobile={isMobile} />
                  </div>
                </div>
              </motion.div>

              <div className="mx-auto mt-5 grid max-w-2xl gap-3 sm:mt-6 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
                {heroBadges.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="w-full rounded-[1.4rem] border border-white/10 bg-white/10 px-5 py-4 text-center backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:min-w-[220px] sm:w-auto sm:rounded-[1.6rem]"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 sm:h-11 sm:w-11">
                          <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                        </div>
                        <div className="text-sm font-bold text-white sm:text-base">{item.title}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </section>

          <section id="about" className="py-4 lg:py-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-8 text-center"
            >
              <LargeSectionBadge icon={BookOpen} text="ගෝලීය කුර්ආනීය හැඳුනුම" />
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.16 }}
                custom={0}
                variants={fadeUp}
              >
                <IdentityCard {...identityCards[0]} large isMobile={isMobile} />
              </motion.div>

              <div className="grid gap-6 lg:grid-cols-2">
                {identityCards.slice(1).map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.16 }}
                    custom={i + 1}
                    variants={fadeUp}
                  >
                    <IdentityCard {...card} isMobile={isMobile} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8 lg:py-12">
            <div className="mb-6 text-center">
              <LargeSectionBadge icon={Building2} text="ක්‍රියාත්මක කිරීම සහ අධීක්ෂණය" />
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className={`relative overflow-hidden p-5 sm:p-6 md:p-10 ${gradientOuterCard}`}
            >
              {!isMobile && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(247,183,24,0.16),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(0,95,86,0.16),transparent_32%)]" />
              )}

              <div className="relative z-10">
                <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
                  <div className="rounded-[1.8rem] border border-white/10 bg-[rgba(18,10,12,0.54)] p-4 sm:p-6">
                    <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                      <h2 className="text-2xl font-black sm:text-3xl lg:text-4xl">
                        විශ්වාසනීය ක්‍රියාත්මක කිරීමේ හවුල්කාරිත්වය
                      </h2>
                      <p className="mt-5 text-base leading-8 text-white/75 sm:text-lg">
                        මෙම ව්‍යාපෘතිය{" "}
                        <span className="font-bold text-white">සනා කුරානි නාලිකා</span>{" "}
                        ක්‍රියාත්මක කරනු ලබන්නේ{" "}
                        <span className="font-bold" style={{ color: ACCENT }}>
                          සෞදි-ජෝර්දාන් විකාශන සමාගම (Jasco)
                        </span>{" "}
                        – අම්මාන්, ජෝර්දානය, මාධ්‍ය නිෂ්පාදනය හා විකාශනය පිළිබඳ ප්‍රමුඛ පළපුරුද්දක් සමඟ.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[1.8rem] border border-white/10 bg-[rgba(18,10,12,0.72)] p-4 sm:p-6">
                    <div className="flex h-full flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                      <div className="text-sm text-white/60">නිල වෙබ් අඩවිය</div>
                      <div className="mt-2 text-xl font-bold sm:text-2xl">Jasco Media City</div>
                      <a
                        href="https://jascomediacity.net/"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex w-fit items-center gap-2 rounded-2xl border border-[rgba(247,183,24,0.24)] bg-[rgba(0,95,86,0.26)] px-5 py-3 text-sm text-[#F7D779] transition hover:bg-[rgba(0,95,86,0.34)] sm:text-base"
                      >
                        Jasco වෙබ් අඩවියට පිවිසෙන්න
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="features" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Sparkles, "වේදිකාවේ විශේෂාංග")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                සනා... ලෝකයන් වෙත පණිවිඩයක්
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                අල් කුර්ආනයේ අර්ථයන් ලෝකයට පිරිනැමීමට නවතම ක්‍රම භාවිත කරන කුර්ආනීය වේදිකාවක්,
                ශරීඅත් පදනම සහ නවීන තාක්ෂණය එකට ගෙන එන ආකාරයකින්.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {features.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section className="py-10 lg:py-14">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Send, "ප්‍රචාරය හා ප්‍රවේශ මාර්ග")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">බහුවිධ පැවැත්ම නාලිකා</h2>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {channels.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="portfolio" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Crown, "අපගේ කෘති")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">අපගේ කෘතිවල නියැදි</h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                විවිධ ලෝක භාෂාවලට අල් කුර්ආනයේ ආයත් අර්ථ පරිවර්තන සමඟ සුමධුර කුර්ආනීය පාරායණ,
                ලෝකය වෙත — සනා... ලෝකයන් වෙත පණිවිඩයක්.
              </p>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {portfolioVideos.map((video, i) => (
                <ProtectedHlsVideoCard
                  key={video}
                  video={video}
                  index={i}
                  isMobile={isMobile}
                  videoId={i}
                  registerVideo={registerVideo}
                  unregisterVideo={unregisterVideo}
                  requestExclusivePlay={requestExclusivePlay}
                />
              ))}
            </div>
          </section>

          <section className="py-12 lg:py-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Globe, "ව්‍යාපෘතියේ බලපෑම")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                ව්‍යාපෘතියේ බලපෑම සහ ලොව පුරා ව්‍යාප්තිය
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                විශ්වාසනීය පරිවර්තන සැපයූ හා බලපෑමකින් යුත් අත්දැකීමක් දුන් ගෝලීය කුර්ආනීය පණිවිඩයක්,
                එය අල් කුර්ආනයේ අර්ථයන් ලොව පුරා නිවෙස් වෙත ළඟා වීමට දායක විය.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {impactCards.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <ImpactCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="partners" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Users, "සාර්ථකත්වයේ හවුල්කරුවන්")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">සහයෝගයෙන් ගොඩනැගුණු සාර්ථකත්වය</h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                මෙම ව්‍යාපෘතිය එහි සාර්ථකත්වය ලබා ගත්තේ විශිෂ්ට ආයතනවල සහයෝගයෙන් වන අතර, ඒ අතර
                ශරීඅත්, මාධ්‍ය, නිෂ්පාදන සහ ස්වේච්ඡා අංශද ඇතුළත් වේ.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2">
              {partners.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="contact" className="py-8 lg:py-12">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <div className="text-center">
                <div
                  className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-base font-semibold backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:px-7 sm:py-4 sm:text-lg"
                  style={{ color: ACCENT }}
                >
                  <Sparkles className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
                  <span>අප හා සම්බන්ධ වන්න</span>
                </div>

                <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-white/75 sm:text-lg">
                  සනා යනු ගෝලීය ධර්මප්‍රචාරක පණිවිඩයකි. ඔබ සමඟ සම්බන්ධ වීමටත් ලබා ගැනීමටත් අපට සතුටුයි
                  ඔබගේ විමසීම්, යෝජනා සහ හවුල්කාරිත්ව අවස්ථා ඕනෑම වේලාවක පැහැදිලි හා සෘජු ආකාරයෙන්.
                </p>
              </div>

              <div
                className={`mt-8 rounded-[2rem] p-4 sm:p-6 md:p-8 ${gradientOuterCard}`}
              >
                <div className="rounded-[2rem] border border-white/10 bg-[rgba(18,10,12,0.72)] p-4 sm:p-6">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 sm:p-5">
                    <div className="mb-4 text-xl font-bold sm:text-2xl">අප අමතන්න</div>
                    <div className="space-y-3 text-white/75">
                      <div className="rounded-2xl bg-white/5 px-4 py-3 text-sm sm:text-base">
                        ඔබට උදව් කිරීමටත් හැකි ඉක්මනින් පිළිතුරු දීමටත් අපගේ කණ්ඩායම සතුටු වනු ඇත.
                      </div>
                      <a
                        href="mailto:snachannel159@gmail.com"
                        className="flex items-center justify-center gap-3 rounded-2xl border border-[rgba(247,183,24,0.24)] bg-[rgba(0,95,86,0.26)] px-4 py-3 text-center text-sm font-semibold text-[#F7D779] transition hover:bg-[rgba(0,95,86,0.34)] sm:text-base"
                      >
                        <Mail className="h-4 w-4" style={{ color: ACCENT }} />
                        යවන්න
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <footer className="pb-8 pt-4 sm:pb-10">
            <div className={`rounded-[2rem] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 ${glass}`}>
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr_1fr]">
                <div
                  className={`rounded-[1.8rem] border border-[rgba(247,183,24,0.22)] p-4 text-center sm:p-6 ${OUTER_GRADIENT} md:backdrop-blur-xl backdrop-blur-sm shadow-[0_14px_36px_rgba(0,0,0,0.34)] flex h-full flex-col items-center justify-center`}
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-[0_0_18px_rgba(255,255,255,0.06)] backdrop-blur-md sm:h-24 sm:w-24">
                    <img
                      src={sanaLogo}
                      alt="සනා ලාංඡනය"
                      className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="mt-4">
                    <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/90 sm:px-5 sm:text-sm">
                      සනා කුරානි නාලිකා
                    </span>
                  </div>

                  <div className="mt-4 text-2xl font-black sm:text-3xl" style={{ color: ACCENT }}>
                    සනා... ලෝකයන් වෙත පණිවිඩයක්
                  </div>

                  <p className="mx-auto mt-4 max-w-[30rem] rounded-[1.4rem] border border-white/10 bg-[rgba(74,16,32,0.52)] px-4 py-4 text-sm leading-7 text-white/78 sm:px-5 sm:text-base sm:leading-8">
                    අල් කුර්ආනයේ අර්ථ පරිවර්තන සඳහා සියලුම ලෝක භාෂාවලට වූ ශ්‍රව්‍ය හා දෘශ්‍ය නාලිකා,
                    ඉදිරිපත් කිරීමේ අලංකාරය, අර්ථයේ නිවැරදිභාවය සහ පණිවිඩයේ ආත්මය එකට ගෙන එන
                    වක්ෆ් ව්‍යාපෘතියක කොටසක් ලෙස.
                  </p>
                </div>

                <div className={`rounded-[1.6rem] border border-[rgba(247,183,24,0.22)] ${OUTER_GRADIENT} p-4 sm:p-5 md:backdrop-blur-xl backdrop-blur-sm shadow-[0_14px_36px_rgba(0,0,0,0.34)] flex flex-col items-center justify-center text-center`}>
                  <div className="mb-5 flex flex-col items-center justify-center gap-4 text-lg font-bold text-white sm:text-xl">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_8px_18px_rgba(0,0,0,0.14)]">
                      <MessageCircle className="h-6 w-6" style={{ color: ACCENT }} />
                    </div>
                    <span>අපගේ විස්තර</span>
                  </div>

                  <div className="w-full space-y-4 text-white/72">
                    <a
                      href="mailto:snachannel159@gmail.com"
                      className="flex items-center justify-center gap-3 break-all rounded-2xl border border-white/10 bg-[rgba(18,10,12,0.58)] px-4 py-3 text-sm transition hover:bg-white/10 sm:text-base"
                    >
                      <Mail className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                      snachannel159@gmail.com
                    </a>

                    <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[rgba(18,10,12,0.58)] px-4 py-3 text-sm sm:text-base">
                      <MapPin className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                      අම්මාන් - ජෝර්දානය
                    </div>
                  </div>

                  <div className="mt-6 w-full rounded-[1.4rem] border border-white/10 bg-[rgba(18,10,12,0.54)] p-4">
                    <a
                      href="https://www.facebook.com/people/%E0%B7%83%E0%B6%B1%E0%B7%8F%E0%B7%83%E0%B7%92%E0%B6%82%E0%B7%84%E0%B6%BD/61587172871591/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] hover:bg-white/10"
                    >
                      <Globe className="h-4 w-4" style={{ color: ACCENT }} />
                      Facebook හි අපව අනුගමනය කරන්න
                    </a>

                    <p className="mt-4 text-center text-sm leading-6 text-white/70">
                      ඔබගේ කුර්ආනීය ගමන දැන් ආරම්භ කරන්න
                    </p>
                  </div>
                </div>

                <div className={`rounded-[1.8rem] border border-[rgba(247,183,24,0.22)] ${OUTER_GRADIENT} p-4 md:backdrop-blur-xl backdrop-blur-sm shadow-[0_14px_36px_rgba(0,0,0,0.34)] sm:p-5 flex flex-col items-center justify-center text-center`}>
                  <div className="mb-5 flex flex-col items-center justify-center gap-4 text-lg font-bold text-white sm:text-xl">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_8px_18px_rgba(0,0,0,0.14)]">
                      <Link2 className="h-6 w-6" style={{ color: ACCENT }} />
                    </div>
                    <span>අපගේ යෙදුම් සබැඳි</span>
                  </div>

                  <div className="w-full rounded-[1.4rem] border border-white/10 bg-[rgba(18,10,12,0.54)] p-4">
                    <p className="mb-4 text-sm leading-7 text-white/65">
                      යෙදුම බාගත කර නිල වේදිකාවන් හරහා කුර්ආනීය අන්තර්ගතය පහසුවෙන් අනුගමනය කරන්න
                      නිල වේදිකාවන් ඔස්සේ.
                    </p>

                    <div className="grid gap-3 md:grid-cols-2">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.sana_all&pcampaignid=web_share"
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-[1.3rem] border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:bg-white/10"
                      >
                        <div className="flex items-center justify-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[rgba(0,95,86,0.22)] text-white">
                            <GooglePlayIcon />
                          </div>
                          <span className="whitespace-nowrap text-sm font-bold text-white sm:text-base">
                            Google Play
                          </span>
                        </div>
                      </a>

                      <a
                        href="https://apps.apple.com/us/app/sana-tv-%D8%B3%D9%86%D8%A7/id6742054715"
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-[1.3rem] border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:bg-white/10"
                      >
                        <div className="flex items-center justify-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[rgba(247,183,24,0.18)] text-white">
                            <AppStoreIcon />
                          </div>
                          <span className="text-sm font-bold text-white sm:text-base">
                            App Store
                          </span>
                        </div>
                      </a>
                    </div>

                    <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-[rgba(24,12,16,0.64)] p-4">
                      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/65">
                        <span>⭐ 4.9 ශ්‍රේණිගත කිරීම</span>
                        <span>🌍 රටවල් 100+</span>
                      </div>

                      <a
                        href="https://www.youtube.com/@%E0%B7%83%E0%B6%B1%E0%B7%8F.%E0%B7%83%E0%B7%92%E0%B6%82%E0%B7%84%E0%B6%BD"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[rgba(247,183,24,0.24)] bg-[rgba(0,95,86,0.26)] py-3 text-sm font-bold text-[#F7D779] transition hover:scale-[1.01] hover:bg-[rgba(0,95,86,0.34)]"
                      >
                        <Sparkles className="h-4 w-4" />
                        දැන් ආරම්භ කරන්න
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-white/55 sm:text-sm">
                සියලු හිමිකම් ඇවිරිණි © සනා කුරානි නාලිකා.
              </div>
            </div>
          </footer>
        </div>
      </div>
    </LazyMotion>
  );
}
