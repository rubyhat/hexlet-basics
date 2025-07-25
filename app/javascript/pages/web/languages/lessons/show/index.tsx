import { AppShell, Box, Center, ScrollArea, Stack, Tabs } from '@mantine/core';
import { BookOpenText } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LessonLayout from '@/pages/layouts/LessonLayout.tsx';
import AssistantTabContent from './components/AssistantTabContent.tsx';
import ControlBox from './components/ControlBox.tsx';
import EditorTab from './components/EditorTab.tsx';
import HTMLPreviewBlock from './components/HTMLPreviewBlock.tsx';
import LessonTabContent from './components/LessonTabContent.tsx';
import NavigationTabContent from './components/NavigationTabContent.tsx';
import OutputTab from './components/OutputTab.tsx';
import SolutionTab from './components/SolutionTab.tsx';
import TestsTab from './components/TestsTab.tsx';
import { useLessonStore } from './store.tsx';

export default function Index() {
  const { t } = useTranslation();
  const changeTab = useLessonStore((state) => state.changeTab);
  const currentTab = useLessonStore((state) => state.currentTab);
  const [focusesCount, setFocusCount] = useState(0);

  const handleSelect = (selectedKey: string | null) => {
    if (selectedKey === 'assistant') {
      setFocusCount((count) => count + 1);
    }
  };

  return (
    <LessonLayout>
      <AppShell.Navbar>
        <Tabs
          defaultValue="lesson"
          onChange={handleSelect}
          h="100%"
          display="flex"
          style={{ flexDirection: 'column' }}
        >
          <Tabs.List grow>
            <Tabs.Tab value="lesson">
              {t('languages.lessons.show.lesson')}
            </Tabs.Tab>
            <Tabs.Tab value="assistant">
              {t('languages.lessons.show.discuss')}
            </Tabs.Tab>
            <Tabs.Tab value="navigation">
              {t('languages.lessons.show.navigation')}
            </Tabs.Tab>
          </Tabs.List>

          <AppShell.Section grow mih={0}>
            <Tabs.Panel value="lesson" h="100%">
              <ScrollArea h="100%">
                <LessonTabContent />
              </ScrollArea>
            </Tabs.Panel>

            <Tabs.Panel value="assistant" h="100%">
              <ScrollArea h="100%">
                <AssistantTabContent focusesCount={focusesCount} />
              </ScrollArea>
            </Tabs.Panel>

            <Tabs.Panel value="navigation" h="100%">
              <ScrollArea h="100%">
                <NavigationTabContent />
              </ScrollArea>
            </Tabs.Panel>
          </AppShell.Section>
        </Tabs>
      </AppShell.Navbar>

      <AppShell.Main h="100%">
        <Tabs
          h="100%"
          display="flex"
          style={{ flexDirection: 'column' }}
          value={currentTab}
          onChange={(key) => changeTab(key as typeof currentTab)}
          // keepMounted={false}
        >
          <Tabs.List grow>
            <Tabs.Tab value="lesson" hiddenFrom="sm">
              <Center>
                <BookOpenText size={14} />
              </Center>
            </Tabs.Tab>
            <Tabs.Tab value="editor">
              {t('languages.lessons.show.editor')}
            </Tabs.Tab>
            <Tabs.Tab value="output">
              {t('languages.lessons.show.output')}
            </Tabs.Tab>
            <Tabs.Tab value="tests">
              {t('languages.lessons.show.tests')}
            </Tabs.Tab>
            <Tabs.Tab value="solution">
              {t('languages.lessons.show.solution')}
            </Tabs.Tab>
          </Tabs.List>

          <AppShell.Section grow mih={0}>
            <Tabs.Panel value="lesson" h="100%" hiddenFrom="sm">
              <Stack h="100%" gap={0}>
                <ScrollArea h="100%">
                  <LessonTabContent />
                </ScrollArea>
                <Box style={{ flexShrink: 0 }}>
                  <ControlBox />
                </Box>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="editor" h="100%">
              <Stack h="100%" gap={0} mih={0} style={{ flexGrow: 1 }}>
                <Stack mih={0} style={{ flexGrow: 1 }}>
                  <EditorTab />
                </Stack>

                <Box style={{ flexShrink: 0 }}>
                  <HTMLPreviewBlock />
                  <ControlBox />
                </Box>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="output" h="100%">
              <Stack h="100%" gap={0}>
                <ScrollArea h="100%">
                  <OutputTab />
                </ScrollArea>
                <Box style={{ flexShrink: 0 }}>
                  <ControlBox />
                </Box>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="tests" h="100%">
              <Stack h="100%" gap={0}>
                <ScrollArea h="100%">
                  <Box p="md">
                    <TestsTab />
                  </Box>
                </ScrollArea>
                <ControlBox />
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="solution" h="100%">
              <Stack h="100%" gap={0}>
                <ScrollArea h="100%">
                  <Box p="md">
                    <SolutionTab />
                  </Box>
                </ScrollArea>
                <ControlBox />
              </Stack>
            </Tabs.Panel>
          </AppShell.Section>
        </Tabs>
      </AppShell.Main>
    </LessonLayout>
  );
}
