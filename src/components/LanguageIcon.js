import React from 'react';
import { SiCsharp, SiGo, SiJava, SiJavascript, SiPhp, SiPython, SiRuby } from 'react-icons/si';

export default function LanguageIcon({ language, ...rest }) {
  switch (language.toLowerCase()) {
    case 'javascript':
      return <SiJavascript {...rest} color="#f5d033" />;
    case 'java':
      return <SiJava {...rest} color="#e51f24" />;
    case 'python':
      return <SiPython {...rest} color="#3571a3" />;
    case 'go':
      return <SiGo {...rest} color="#67d0de" />;
    case 'c#':
      return <SiCsharp {...rest} color="#934a90" />;
    case 'ruby':
      return <SiRuby {...rest} color="#e80e12" />;
    case 'php':
      return <SiPhp {...rest} color="#858ebb" />;
    default:
      return null;
  }
}
