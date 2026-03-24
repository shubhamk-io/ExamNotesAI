import React, { useEffect, useRef } from 'react'
import mermaid from "mermaid"

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
})

const mermaidDiagram = (diagram) => {
  if (!diagram) return "";

  let clean = diagram
    .replace(/\\n/g, "\n")
    .trim()

  if (!clean.startsWith("graph")) {
    clean = `graph TD\n${clean}`
  }

  return clean;
}

const autoFixNotes = (diagram) => {
  let index = 0;
  const used = new Map();

  return diagram.replace(/\[(.*?)\]/g, (match, label) => {
    const key = label.trim();

    if (used.has(key)) {
      return used.get(key);
    }

    index++;
    const id = `N${index}`;
    const node = `${id}["${key}"]`;

    used.set(key, node);
    return node;
  });
};

const MermaidSetup = ({ diagram }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        containerRef.current.innerHTML = "";

        const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`

        let fixed = autoFixNotes(diagram);
        const safeChart = mermaidDiagram(fixed);

        const { svg } = await mermaid.render(uniqueId, safeChart)

        containerRef.current.innerHTML = svg;

      } catch (error) {
        console.error("Mermaid render failed:", error)
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

export default MermaidSetup