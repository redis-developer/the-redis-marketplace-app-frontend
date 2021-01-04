// TODO: Filters: type, contributed_by, quick_deploy, language, redis_commands, redis_features, redis_modules, special_tags
export const tags = [
  {
    category: 'Product',
    options: [
      'RediSearch',
      'RedisJSON',
      'RedisGears',
      'RedisAI',
      'RedisGraph',
      'RedisTimeSeries',
      'RedisBloom'
    ]
  },
  { category: 'Language', options: ['PHP', 'Java', 'JavaScript', 'Python', 'Ruby'] },
  { category: 'Contributed By', options: ['Redis Labs', 'Community', 'Partner'] },
  { category: 'Sample Type', options: ['Building Block', 'Full App'] }
];

export const samples = [
  {
    id: 'test-project-1',
    app_name: 'Basic Redis caching example in Nodejs',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tristique malesuada urna, vel pharetra turpis. Nullam eu lacus id dui viverra facilisis. Phasellus finibus sed enim id commodo. Sed turpis nisl, venenatis nec magna id, aliquet tincidunt nulla. Nunc luctus porta elit, non pharetra neque imperdiet eu. In sagittis placerat ante ut porttitor. Duis tincidunt varius sapien, et accumsan massa varius eget. In tincidunt, dui et aliquam blandit, nibh neque porta dolor, vestibulum vehicula odio tortor elementum nibh. Nunc venenatis semper vulputate.',
    type: 'Building Block',
    contributed_by: 'Redis Labs',
    repo_url: 'https://github.com/redis-developer/basic-caching-demo-nodejs',
    download_url: 'https://github.com/redis-developer/basic-caching-demo-nodejs/archive/main.zip',
    hosted_url: '',
    quick_deploy: 'true',
    deploy_buttons: [
      {
        heroku:
          'https://heroku.com/deploy?template=https://github.com/redis-developer/basic-caching-demo-nodejs'
      },
      {
        vercel:
          'https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fredis-developer%2Fbasic-caching-demo-nodejs&env=REDIS_ENDPOINT_URI,REDIS_PASSWORD&envDescription=REDIS_ENDPOINT_URI%20is%20required%20at%20least%20to%20connect%20to%20Redis%20clouding%20server'
      },
      {
        Google:
          'https://deploy.cloud.run/?git_repo=https://github.com/redis-developer/basic-caching-demo-nodejs.git'
      }
    ],
    language: 'JavaScript',
    redis_commands: ['SETEX'],
    redis_features: ['caching'],
    redis_modules: [],
    app_image_urls: [
      'https://github.com/redis-developer/basic-caching-demo-nodejs/blob/main/docs/screenshot001.png?raw=true'
    ],
    youtube_url: '',
    special_tags: []
  },
  {
    id: 'test-project-2',
    app_name: 'Basic Redis caching example in Java',
    description:
      'Nullam eu lacus id dui viverra facilisis. Phasellus finibus sed enim id commodo. Sed turpis nisl, venenatis nec magna id, aliquet tincidunt nulla. Nunc luctus porta elit, non pharetra neque imperdiet eu. In sagittis placerat ante ut porttitor. Duis tincidunt varius sapien, et accumsan massa varius eget. In tincidunt, dui et aliquam blandit, nibh neque porta dolor, vestibulum vehicula odio tortor elementum nibh. Nunc venenatis semper vulputate.',
    type: 'Building Block',
    contributed_by: 'Redis Labs',
    repo_url: 'https://github.com/redis-developer/basic-caching-demo-nodejs',
    download_url: 'https://github.com/redis-developer/basic-caching-demo-nodejs/archive/main.zip',
    hosted_url: '',
    quick_deploy: 'true',
    deploy_buttons: [
      {
        heroku:
          'https://heroku.com/deploy?template=https://github.com/redis-developer/basic-caching-demo-nodejs'
      },
      {
        vercel:
          'https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fredis-developer%2Fbasic-caching-demo-nodejs&env=REDIS_ENDPOINT_URI,REDIS_PASSWORD&envDescription=REDIS_ENDPOINT_URI%20is%20required%20at%20least%20to%20connect%20to%20Redis%20clouding%20server'
      },
      {
        Google:
          'https://deploy.cloud.run/?git_repo=https://github.com/redis-developer/basic-caching-demo-nodejs.git'
      }
    ],
    language: 'Java',
    redis_commands: ['SETEX'],
    redis_features: ['caching', 'searching'],
    redis_modules: [],
    app_image_urls: [
      'https://github.com/redis-developer/basic-caching-demo-nodejs/blob/main/docs/screenshot001.png?raw=true'
    ],
    youtube_url: '',
    special_tags: []
  },
  {
    id: 'test-project-3',
    app_name: 'Basic Redis caching example in PHP',
    description:
      'Nullam eu lacus id dui viverra facilisis. Phasellus finibus sed enim id commodo. Sed turpis nisl, venenatis nec magna id, aliquet tincidunt nulla. Nunc luctus porta elit, non pharetra neque imperdiet eu. In sagittis placerat ante ut porttitor. Duis tincidunt varius sapien, et accumsan massa varius eget. In tincidunt, dui et aliquam blandit, nibh neque porta dolor, vestibulum vehicula odio tortor elementum nibh. Nunc venenatis semper vulputate.',
    type: 'Full App',
    contributed_by: 'Redis Labs',
    repo_url: 'https://github.com/redis-developer/basic-caching-demo-nodejs',
    download_url: 'https://github.com/redis-developer/basic-caching-demo-nodejs/archive/main.zip',
    hosted_url: '',
    quick_deploy: 'true',
    deploy_buttons: [
      {
        heroku:
          'https://heroku.com/deploy?template=https://github.com/redis-developer/basic-caching-demo-nodejs'
      },
      {
        vercel:
          'https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fredis-developer%2Fbasic-caching-demo-nodejs&env=REDIS_ENDPOINT_URI,REDIS_PASSWORD&envDescription=REDIS_ENDPOINT_URI%20is%20required%20at%20least%20to%20connect%20to%20Redis%20clouding%20server'
      },
      {
        Google:
          'https://deploy.cloud.run/?git_repo=https://github.com/redis-developer/basic-caching-demo-nodejs.git'
      }
    ],
    language: 'PHP',
    redis_commands: ['SETEX'],
    redis_features: ['caching'],
    redis_modules: [],
    app_image_urls: [
      'https://github.com/redis-developer/basic-caching-demo-nodejs/blob/main/docs/screenshot001.png?raw=true'
    ],
    youtube_url: '',
    special_tags: []
  },
  {
    id: 'test-project-4',
    app_name: 'Basic Redis caching example in C#',
    description:
      'Nullam eu lacus id dui viverra facilisis. Phasellus finibus sed enim id commodo. Sed turpis nisl, venenatis nec magna id, aliquet tincidunt nulla. Nunc luctus porta elit, non pharetra neque imperdiet eu. In sagittis placerat ante ut porttitor. Duis tincidunt varius sapien, et accumsan massa varius eget. In tincidunt, dui et aliquam blandit, nibh neque porta dolor, vestibulum vehicula odio tortor elementum nibh. Nunc venenatis semper vulputate.',
    type: 'Full App',
    contributed_by: 'Redis Labs',
    repo_url: 'https://github.com/redis-developer/basic-caching-demo-nodejs',
    download_url: 'https://github.com/redis-developer/basic-caching-demo-nodejs/archive/main.zip',
    hosted_url: '',
    quick_deploy: 'true',
    deploy_buttons: [
      {
        heroku:
          'https://heroku.com/deploy?template=https://github.com/redis-developer/basic-caching-demo-nodejs'
      },
      {
        vercel:
          'https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fredis-developer%2Fbasic-caching-demo-nodejs&env=REDIS_ENDPOINT_URI,REDIS_PASSWORD&envDescription=REDIS_ENDPOINT_URI%20is%20required%20at%20least%20to%20connect%20to%20Redis%20clouding%20server'
      },
      {
        Google:
          'https://deploy.cloud.run/?git_repo=https://github.com/redis-developer/basic-caching-demo-nodejs.git'
      }
    ],
    language: 'C#',
    redis_commands: ['SETEX'],
    redis_features: ['caching'],
    redis_modules: [],
    app_image_urls: [
      'https://github.com/redis-developer/basic-caching-demo-nodejs/blob/main/docs/screenshot001.png?raw=true'
    ],
    youtube_url: '',
    special_tags: []
  },
  {
    id: 'test-project-5',
    app_name: 'Basic Redis caching example in Ruby',
    description:
      'Nullam eu lacus id dui viverra facilisis. Phasellus finibus sed enim id commodo. Sed turpis nisl, venenatis nec magna id, aliquet tincidunt nulla. Nunc luctus porta elit, non pharetra neque imperdiet eu. In sagittis placerat ante ut porttitor. Duis tincidunt varius sapien, et accumsan massa varius eget. In tincidunt, dui et aliquam blandit, nibh neque porta dolor, vestibulum vehicula odio tortor elementum nibh. Nunc venenatis semper vulputate.',
    type: 'Full App',
    contributed_by: 'Redis Labs',
    repo_url: 'https://github.com/redis-developer/basic-caching-demo-nodejs',
    download_url: 'https://github.com/redis-developer/basic-caching-demo-nodejs/archive/main.zip',
    hosted_url: '',
    quick_deploy: 'true',
    deploy_buttons: [
      {
        heroku:
          'https://heroku.com/deploy?template=https://github.com/redis-developer/basic-caching-demo-nodejs'
      },
      {
        vercel:
          'https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fredis-developer%2Fbasic-caching-demo-nodejs&env=REDIS_ENDPOINT_URI,REDIS_PASSWORD&envDescription=REDIS_ENDPOINT_URI%20is%20required%20at%20least%20to%20connect%20to%20Redis%20clouding%20server'
      },
      {
        Google:
          'https://deploy.cloud.run/?git_repo=https://github.com/redis-developer/basic-caching-demo-nodejs.git'
      }
    ],
    language: 'Ruby',
    redis_commands: ['SETEX'],
    redis_features: ['caching'],
    redis_modules: [],
    app_image_urls: [
      'https://github.com/redis-developer/basic-caching-demo-nodejs/blob/main/docs/screenshot001.png?raw=true'
    ],
    youtube_url: '',
    special_tags: []
  }
];
