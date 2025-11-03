import React from 'react';

const healthcareBlogs = [
  {
    id: 1,
    title: 'Semaglutide Breakthrough: Heart Protection Beyond Weight Loss',
    href: '#',
    description:
      'Recent clinical trials reveal that semaglutide offers significant cardiovascular benefits, reducing heart attack and stroke risk by 20% regardless of weight loss. This breakthrough opens new possibilities for heart disease prevention in diabetic and obese patients.',
    date: 'Nov 02, 2025',
    datetime: '2025-11-02',
    category: { title: 'Cardiology', href: '#' },
    author: {
      name: 'Dr. Sarah Mitchell',
      role: 'Cardiologist & Pharmaceutical Researcher',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'Revolutionary Antibiotic Discovery: 100x Stronger Against Superbugs',
    href: '#',
    description:
      'Scientists have discovered a hidden antibiotic 100 times stronger against deadly superbugs like MRSA. This groundbreaking molecule, found in a familiar bacterium, shows no resistance patterns and could transform infectious disease treatment.',
    date: 'Oct 29, 2025',
    datetime: '2025-10-29',
    category: { title: 'Infectious Disease', href: '#' },
    author: {
      name: 'Dr. James Chen',
      role: 'Microbiologist & Infectious Disease Specialist',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: 'Wellness Tips for 2025: Building Sustainable Healthy Habits',
    href: '#',
    description:
      'Learn practical strategies for maintaining optimal health in 2025, including nutrition planning, regular exercise, stress management, and preventive healthcare. Discover how small daily changes can lead to significant long-term wellness improvements.',
    date: 'Dec 23, 2024',
    datetime: '2024-12-23',
    category: { title: 'Wellness', href: '#' },
    author: {
      name: 'Dr. Emily Rodriguez',
      role: 'Preventive Medicine & Wellness Director',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
];

export default function BlogSection() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl mb-20 text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            From Our Medical Experts
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Stay informed with the latest healthcare insights, pharmaceutical breakthroughs, and wellness strategies 
            from our expert medical professionals.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 md:grid-cols-2 lg:grid-cols-3">
          {healthcareBlogs.map((post) => (
            <article key={post.id} className="flex max-w-xl flex-col gap-3 space-x-3 items-start justify-between">
              <div className="flex items-center gap-x-6 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time>
                <a
                  href={post.category.href}
                  className="relative z-10 rounded-full bg-blue-50 px-3 py-1.5 font-medium text-blue-600 hover:bg-blue-100"
                >
                  {post.category.title}
                </a>
              </div>
              <div className="group relative grow">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                  {post.description}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                <img 
                  alt={post.author.name} 
                  src={post.author.imageUrl} 
                  className="size-10 rounded-full bg-gray-50" 
                />
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                  <p className="text-gray-600">{post.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}