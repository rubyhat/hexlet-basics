import { usePage } from '@inertiajs/react';
import { AppShell, Box, Container, Stack, Title } from '@mantine/core';
import { useDisclosure, useWindowEvent } from '@mantine/hooks';
import { type PropsWithChildren, useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';

import { XBreadcrumb } from '@/components/breadcrumbs.tsx';
import XFlash from '@/components/XFlash.tsx';
import { isCurrentUrl } from '@/lib/utils.ts';
import cookieTranslations from '@/locales/cookie_consent.ts';
import * as Routes from '@/routes.js';
import type { BreadcrumbItem, SharedProps } from '@/types/index.js';
import ContactMethodRequestingBlock from './blocks/ContactMethodRequestingBlock.tsx';
// import TgContestBanner from "./banners/tg_contest_banner/TgContestBanner.tsx";
import FooterBlock from './blocks/FooterBlock.tsx';
import NavbarBlock from './blocks/NavbarBlock.tsx';
import RootLayout from './RootLayout.tsx';

type Props = PropsWithChildren & {
  header?: string;
  center?: boolean;
  items?: BreadcrumbItem[];
};

export default function ApplicationLayout({
  children,
  header,
  items,
  center = false,
}: Props) {
  const page = usePage<SharedProps>();
  const {
    props: { shouldAddContactMethod },
  } = page;
  const [opened, { toggle }] = useDisclosure();

  useWindowEvent('load', () => {
    CookieConsent.run({
      categories: {
        necessary: {
          enabled: true, // this category is enabled by default
          readOnly: true, // this category cannot be disabled
        },
        analytics: {},
      },
      language: {
        autoDetect: 'document',
        default: 'ru',
        translations: cookieTranslations,
      },
    });
  });

  return (
    <RootLayout>
      <AppShell header={{ height: 60 }}>
        <AppShell.Header>
          <NavbarBlock onToggle={toggle} opened={opened} />
        </AppShell.Header>

        <AppShell.Main>
          <XFlash />
          {shouldAddContactMethod && isCurrentUrl(Routes.new_lead_path()) && (
            <Box mt="lg">
              <ContactMethodRequestingBlock />
            </Box>
          )}
          {(items || header) && (
            <Container size="lg" my="xl">
              <Stack>
                {items && <XBreadcrumb items={items} />}
                {header && (
                  <Title order={1} ta={center ? 'center' : 'left'}>
                    {header}
                  </Title>
                )}
              </Stack>
            </Container>
          )}
          {children}
        </AppShell.Main>

        {/* <AppShell.Footer> */}
        <FooterBlock />
        {/* </AppShell.Footer> */}
      </AppShell>
    </RootLayout>
  );
}
