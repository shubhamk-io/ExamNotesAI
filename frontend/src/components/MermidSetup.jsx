import React, { useEffect, useRef } from 'react'
import mermaid from "mermaid"

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  themeVariables: {
    primaryColor: '#6366f1',
    primaryTextColor: '#ffffff',
    primaryBorderColor: '#4f46e5',
    lineColor: '#4f46e5',
    secondaryColor: '#a855f7',
    secondaryTextColor: '#ffffff',
    secondaryBorderColor: '#9333ea',
    tertiaryColor: '#06b6d4',
    tertiaryTextColor: '#ffffff',
    tertiaryBorderColor: '#0891b2',
    background: '#ffffff',
    mainBkg: '#6366f1',
    clusterBkg: '#f1f5f9',
    clusterBorder: '#cbd5e1',
    titleColor: '#1e293b',
    edgeLabelBackground: '#f8fafc',
    fontFamily: 'sans-serif',
    fontSize: '14px',
  }
})

const mermaidDiagram = (diagram) => {
  if (!diagram) return;

  let clean = diagram
    .replace(/\\n/g, "\n")
    .replace(/\r?\n/g, "\n")
    .trim()

  if (!clean.startsWith("graph")) {
    clean = `graph TD\n${clean}`
  }
  return clean;
}

const autoFixBadNotes = (diagram) => {
  let index = 0;
  return diagram.replace(/\[(.*?)\]/g, (_, label) => {
    index++;
    return `N${index}[${label}]`;
  });
}

const MermidSetup = ({ diagram }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        containerRef.current.innerHTML = "";

        const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`

        const unescaped = diagram.replace(/\\n/g, "\n");
        let fixed = autoFixBadNotes(unescaped);
        const safeChart = mermaidDiagram(fixed);

        const { svg } = await mermaid.render(uniqueId, safeChart)

        containerRef.current.innerHTML = svg;

      } catch (error) {
        console.log("Mermaid render failed :", error)
      }
    }
    renderDiagram()
  }, [diagram])

  return (
    <div className='bg-white border rounded-lg p-4 overflow-x-auto'>
      <div ref={containerRef} />
    </div>
  )
}

export default MermidSetup