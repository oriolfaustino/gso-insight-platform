// Playwright-based web crawler as fallback for Firecrawl
import { chromium } from 'playwright';

export interface PlaywrightScrapeResult {
  success: boolean;
  data?: {
    markdown: string;
    html: string;
    metadata: {
      title: string;
      description: string;
      url: string;
      statusCode: number;
    };
  };
  error?: string;
}

export async function scrapeWithPlaywright(url: string): Promise<PlaywrightScrapeResult> {
  let browser;
  
  try {
    console.log(`🎭 Starting Playwright crawler for ${url}...`);
    
    // Launch browser
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (compatible; GSO-Insight-Bot/1.0)',
      viewport: { width: 1280, height: 720 }
    });
    
    const page = await context.newPage();
    
    // Navigate to the page
    const response = await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 20000
    });
    
    if (!response) {
      throw new Error('Failed to load page');
    }
    
    const statusCode = response.status();
    
    if (statusCode >= 400) {
      throw new Error(`HTTP ${statusCode}: Failed to access ${url}`);
    }
    
    // Wait for content to load
    await page.waitForTimeout(2000);
    
    // Extract metadata
    const title = await page.title();
    const description = await page.getAttribute('meta[name="description"]', 'content') || 
                       await page.getAttribute('meta[property="og:description"]', 'content') || '';
    
    // Get HTML content
    const html = await page.content();
    
    // Convert to markdown-like text
    const markdown = await page.evaluate(() => {
      // Remove script and style elements
      const scripts = document.querySelectorAll('script, style, nav, footer, header, aside');
      scripts.forEach(el => el.remove());
      
      // Get main content
      const main = document.querySelector('main') || 
                   document.querySelector('[role="main"]') || 
                   document.querySelector('.main-content') ||
                   document.querySelector('#main') ||
                   document.body;
      
      if (!main) return document.body.innerText;
      
      // Extract text with basic markdown formatting
      let text = '';
      
      const processElement = (element: Element, level = 0): void => {
        const tagName = element.tagName.toLowerCase();
        
        // Handle headings
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
          const hLevel = parseInt(tagName.substring(1));
          text += '\n' + '#'.repeat(hLevel) + ' ' + element.textContent?.trim() + '\n\n';
          return;
        }
        
        // Handle paragraphs
        if (tagName === 'p') {
          text += element.textContent?.trim() + '\n\n';
          return;
        }
        
        // Handle lists
        if (tagName === 'li') {
          text += '- ' + element.textContent?.trim() + '\n';
          return;
        }
        
        // Handle links
        if (tagName === 'a') {
          const href = element.getAttribute('href');
          const linkText = element.textContent?.trim();
          if (href && linkText) {
            text += `[${linkText}](${href}) `;
          }
          return;
        }
        
        // Process children for other elements
        for (const child of element.children) {
          processElement(child, level + 1);
        }
        
        // Add text content for leaf elements
        if (element.children.length === 0 && element.textContent?.trim()) {
          text += element.textContent.trim() + ' ';
        }
      };
      
      processElement(main);
      
      // Clean up the text
      return text
        .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove multiple newlines
        .replace(/\s+/g, ' ') // Normalize spaces
        .trim();
    });
    
    await browser.close();
    
    console.log(`✅ Playwright crawling completed for ${url}, content length: ${markdown.length}`);
    
    return {
      success: true,
      data: {
        markdown,
        html,
        metadata: {
          title,
          description,
          url,
          statusCode
        }
      }
    };
    
  } catch (error) {
    if (browser) {
      await browser.close();
    }
    
    console.error(`❌ Playwright crawling failed for ${url}:`, error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Simple HTML to markdown converter (unused but kept for reference)
function htmlToMarkdown(html: string): string {
  return html
    .replace(/<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi, (_, level, text) => {
      return '\n' + '#'.repeat(parseInt(level)) + ' ' + text.trim() + '\n\n';
    })
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<[^>]+>/g, '') // Remove remaining HTML tags
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Clean up multiple newlines
    .trim();
}