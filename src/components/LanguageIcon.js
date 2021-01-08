import React from 'react';
import { SiCsharp, SiGo, SiJava, SiJavascript, SiPhp, SiPython, SiRuby } from 'react-icons/si';

export default function LanguageIcon({ language, ...rest }) {
  switch (language.toLowerCase()) {
    case 'javascript':
      return <SiJavascript {...rest} />;
    case 'java':
      return <SiJava {...rest} />;
    case 'python':
      return <SiPython {...rest} />;
    case 'go':
      return <SiGo {...rest} />;
    case 'c#':
      return <SiCsharp {...rest} />;
    case 'ruby':
      return <SiRuby {...rest} />;
    case 'php':
      return <SiPhp {...rest} />;
    default:
      return null;
  }
}
