import React from 'react';

interface FooterProps {
  language?: string;
}

export function Footer({ language = 'english' }: FooterProps) {
  const isRTL = language === 'arabic';

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 text-center text-xs text-gray-500 text-text">
      <p>
        &copy; {new Date().getFullYear()} {isRTL ? 'فيديك إي آي. جميع الحقوق محفوظة.' : 'FIDIC AI. All rights reserved.'}
      </p>
    </footer>
  );
}
