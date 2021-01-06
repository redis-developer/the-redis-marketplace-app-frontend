import React from 'react';
import { SiCsharp, SiGo, SiJava, SiJavascript, SiPhp, SiPython, SiRuby } from 'react-icons/si';

export default function LanguageIcon({ language, ...rest }) {
  switch (language) {
    case 'JavaScript':
      return <SiJavascript {...rest} />;
    case 'Java':
      return <SiJava {...rest} />;
    case 'Python':
      return <SiPython {...rest} />;
    case 'GO':
      return <SiGo {...rest} />;
    case 'C#':
      return <SiCsharp {...rest} />;
    case 'Ruby':
      return <SiRuby {...rest} />;
    case 'PHP':
      return <SiPhp {...rest} />;
    default:
      return null;
  }
}
