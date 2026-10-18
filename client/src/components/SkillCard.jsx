import { motion } from 'framer-motion'
import {
  SiC, SiCplusplus, SiFastapi, SiGit, SiGithub,
  SiHtml5, SiHuggingface, SiJupyter, SiLangchain,
  SiMeta, SiMongodb, SiMysql, SiNumpy, SiOpencv,
  SiPandas, SiPlotly, SiPostgresql, SiPython,
  SiPytorch, SiReact, SiScikitlearn, SiTailwindcss,
  SiTensorflow, SiJavascript, SiStreamlit, SiDocker,
  SiSqlite, SiExpress, SiNodedotjs,
} from 'react-icons/si'
import { FaChartBar, FaCss3Alt, FaRobot } from 'react-icons/fa'
import { TbBrandVscode } from 'react-icons/tb'

const ICONS = {
  SiC,
  SiCplusplus,
  SiCss3:            FaCss3Alt,
  SiFastapi,
  SiGit,
  SiGithub,
  SiHtml5,
  SiHuggingface,
  SiJupyter,
  SiLangchain,
  SiMeta,
  SiMongodb,
  SiMysql,
  SiNumpy,
  SiOpenai:          FaRobot,
  SiOpencv,
  SiPandas,
  SiPlotly,
  SiPostgresql,
  SiPowerbi:         FaChartBar,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiTailwindcss,
  SiTensorflow,
  SiVisualstudiocode: TbBrandVscode,
  SiJavascript,
  SiStreamlit,
  SiDocker,
  SiSqlite,
  SiExpress,
  SiNodedotjs,
}

export default function SkillCard({ skill, index = 0 }) {
  const Icon = ICONS[skill.icon] || null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ y: -3 }}
      className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-(--border) bg-(--bg-card) p-4 text-center transition-all duration-250 hover:border-(--border-hover) hover:shadow-[0_4px_20px_rgba(56,189,248,0.12)] cursor-default"
      style={{ minHeight: '7rem' }}
    >
      {/* hover glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(56,189,248,0.06), transparent 70%)' }}
        aria-hidden="true"
      />

      {/* icon */}
      {Icon ? (
        <Icon
          className="h-7 w-7 text-(--accent-blue) group-hover:text-(--accent-purple) transition-colors duration-250"
          aria-hidden="true"
        />
      ) : (
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-(--bg-secondary) text-xs font-bold text-(--text-muted)"
          aria-hidden="true"
        >
          {skill.name.slice(0, 2).toUpperCase()}
        </span>
      )}

      {/* name */}
      <span className="text-xs font-semibold leading-tight text-(--text-secondary) group-hover:text-(--text-primary) transition-colors duration-200">
        {skill.name}
      </span>
    </motion.div>
  )
}
