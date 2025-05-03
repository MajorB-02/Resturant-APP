import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const websiteStructure = {
      pages: [],
      components: [],
      context: [],
      public: []
    };

    // Get all pages
    const pagesDir = path.join(process.cwd(), 'src/app');
    const getPages = (dir: string, basePath = '') => {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const relativePath = path.join(basePath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          getPages(fullPath, relativePath);
        } else if (item === 'page.tsx') {
          websiteStructure.pages.push({
            path: relativePath.replace(/\\/g, '/').replace('/page.tsx', ''),
            content: fs.readFileSync(fullPath, 'utf-8')
          });
        }
      });
    };
    getPages(pagesDir);

    // Get all components
    const componentsDir = path.join(process.cwd(), 'src/components');
    if (fs.existsSync(componentsDir)) {
      const components = fs.readdirSync(componentsDir);
      components.forEach(component => {
        if (component.endsWith('.tsx')) {
          websiteStructure.components.push({
            name: component,
            content: fs.readFileSync(path.join(componentsDir, component), 'utf-8')
          });
        }
      });
    }

    // Get all context
    const contextDir = path.join(process.cwd(), 'src/context');
    if (fs.existsSync(contextDir)) {
      const contexts = fs.readdirSync(contextDir);
      contexts.forEach(context => {
        if (context.endsWith('.tsx')) {
          websiteStructure.context.push({
            name: context,
            content: fs.readFileSync(path.join(contextDir, context), 'utf-8')
          });
        }
      });
    }

    // Get public directory structure
    const publicDir = path.join(process.cwd(), 'public');
    if (fs.existsSync(publicDir)) {
      const getPublicFiles = (dir: string, basePath = '') => {
        const items = fs.readdirSync(dir);
        items.forEach(item => {
          const fullPath = path.join(dir, item);
          const relativePath = path.join(basePath, item);
          const stat = fs.statSync(fullPath);

          if (stat.isDirectory()) {
            getPublicFiles(fullPath, relativePath);
          } else {
            websiteStructure.public.push(relativePath.replace(/\\/g, '/'));
          }
        });
      };
      getPublicFiles(publicDir);
    }

    return NextResponse.json(websiteStructure);
  } catch (error) {
    console.error('Error analyzing website:', error);
    return NextResponse.json({ error: 'Failed to analyze website' }, { status: 500 });
  }
} 