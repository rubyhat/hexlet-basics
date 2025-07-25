import { usePage } from '@inertiajs/react';
import { Container, Grid, Group, SimpleGrid, Stack } from '@mantine/core';
import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import BlogPostBlock from '@/components/BlogPostBlock';
import ApplicationLayout from '@/pages/layouts/ApplicationLayout';
import * as Routes from '@/routes.js';
import type { BreadcrumbItem, SharedProps } from '@/types';
import type { BlogPost, Pagy } from '@/types/serializers';

type Props = PropsWithChildren & {
  blogPosts: BlogPost[];
  pagy: Pagy;
};

export default function Index({ blogPosts, pagy }: Props) {
  const { t } = useTranslation();
  const header = t('blog_posts.index.header');
  const { suffix } = usePage<SharedProps>().props;

  const items: BreadcrumbItem[] = [
    {
      name: header,
      url: Routes.blog_posts_url({ suffix }),
    },
  ];

  return (
    <ApplicationLayout items={items} header={header}>
      <Container size="lg" my="xl">
        <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="md">
          {blogPosts.map((post) => (
            <BlogPostBlock key={post.id} post={post} />
          ))}
        </SimpleGrid>
        {/* <XPaging pagy={pagy} /> */}
      </Container>
    </ApplicationLayout>
  );
}
