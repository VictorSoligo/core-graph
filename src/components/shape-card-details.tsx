interface ShapeCardDetailsProps {
  text: string
}

export function ShapeCardDetails({ text }: ShapeCardDetailsProps) {
  return <span className="text-xs text-zinc-400">{text}</span>
}
