// src/components/StoryWrapper.jsx (النسخة الجديدة والمبسطة)

import { useParams } from "react-router-dom";

// 1. استيراد مكون StoryPage الموحد الذي يعتمد على البيانات
import StoryPage from '../component/StoryPage';

export default function StoryWrapper() {
  const { unitId } = useParams();
  return (
    <>
      <h1 className="shine-text text-4xl sm:text-5xl font-bold text-center lg:mt-10">
        Unit {unitId}
      </h1>
      <StoryPage />
    </>
  );
}
