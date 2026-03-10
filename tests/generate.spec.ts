import { test, expect } from '@playwright/test';

test('generate', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#target', { state: 'visible' });
    await page.fill('#target', '先生');
    await page.fill('#symptom', '目のかゆみ')
    await page.fill('#situation', '講義前');
    await page.fill('#level', '4');
    await page.fill('#nuance', 'ビジネスライク');
    await page.click('#generate');

    await page.waitForSelector('#result-card', { state: 'visible' });

    let excuse = await page.textContent('#excuse-text');
    console.log('生成結果:', excuse);

    await page.waitForTimeout(5000); // 5秒待つ

    await page.click('#retry-button');
    
    await page.waitForSelector('#retry-instruction');
    await page.fill('#retry-instruction', "もっと面白くして");
    await page.waitForTimeout(500); // 0.5秒待つ

    await page.click('#retry-submit');
    await page.waitForSelector('#result-card', { state: 'visible' });

    excuse = await page.textContent('#excuse-text');
    console.log('生成結果:', excuse);

    await page.waitForTimeout(5000); // 5秒待つ
});
