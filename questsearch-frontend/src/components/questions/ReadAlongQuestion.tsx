interface ReadAlongQuestionProps {
  title: string;
}

export function ReadAlongQuestion({ title }: ReadAlongQuestionProps) {
  return (
    <div className="mt-4">
      <p className="text-lg text-gray-700">{title}</p>
    </div>
  );
}
