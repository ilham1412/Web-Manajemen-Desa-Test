// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3001/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Desa/);
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:3001/');
  await page.getByRole('link', { name: 'Mulai Sekarang' }).click();
});

test.describe('Dashboard Tests (with login)', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    await page.getByLabel('Email').fill('test@gmail.com');
    await page.getByLabel('Password').fill('12345678');
    await page.waitForTimeout(15000);
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page).toHaveURL('http://localhost:3001/dashboard', { timeout: 5000 });
  });

  test('login page success', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:3001/dashboard');
  });

  test('Create peraturan', async ({ page }) => {
    await page.waitForTimeout(5000);
    await page.goto('http://localhost:3001/dashboard/peraturan');

    await page.getByRole('button', { name: 'Tambah' }).first().click();
    await page.getByLabel('judul peraturan').fill('Peraturan Desa Test');
    await page.getByLabel('Nomor Peraturan').fill('Nomor 4 tahun 2025');
    await page.getByLabel('Tanggal Berlaku').fill('2025-11-29');
    await page.getByRole('button', { name: 'Tambah Peraturan' }).click();

  });

  test('create aset', async ({ page }) => {
    await page.waitForTimeout(5000);
    await page.goto('http://localhost:3001/dashboard/assets');
    await expect(page).toHaveURL('http://localhost:3001/dashboard/assets');

    await page.getByRole('button', { name: 'Tambah' }).first().click();
    await page.getByLabel('Nama Aset').fill('Aset Desa Test');
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Baik' }).click();
    
    await page.getByLabel('NUP').fill('12345');
    await page.getByLabel('Merk/Tipe').fill('Toyota');
    await page.getByLabel('Tanggal Perolehan').fill('2025-11-29');
    await page.getByLabel('Nilai (Rp)').fill('10000000');
    await page.getByLabel('Catatan').fill('test saja');
    
    await page.getByRole('button', { name: 'Simpan Aset' }).click();
  });

  test('report assets', async ({ page }) => {
    await page.waitForTimeout(5000);
    await page.goto("http://localhost:3001/dashboard/damage-reports");
    await expect(page).toHaveURL('http://localhost:3001/dashboard/damage-reports');
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Tambah Laporan' }).click();
    await page.getByRole('combobox').nth(0).click();
    await page.getByRole('option', {name: 'Aset Desa Test'}).nth(0).click();
    await page.getByRole('combobox').nth(1).click();
    await page.getByRole('option', { name: 'Ringan' }).click();
    await page.getByRole('button', { name: 'Tambah Laporan' }).click();
  });

  test('create Keputusan', async ({ page }) => {
    await page.waitForTimeout(5000);
    await page.goto('http://localhost:3001/dashboard/keputusan');
    await expect(page).toHaveURL('http://localhost:3001/dashboard/keputusan');
    await page.getByRole('button', { name: 'Tambah' }).first().click();
    await page.getByLabel('Nomor Keputusan').fill('001/KEP/DS/2025');
    await page.getByLabel('Tanggal Keputusan').fill('2025-11-29');
    
    await page.getByLabel('Tentang').fill('Keputusan tentang Desa Test');
    await page.getByLabel('Nomor Dilaporkan').fill('LAP-01/2025');
    await page.getByLabel('Tanggal Dilaporkan').fill('2025-11-29');
    await page.getByRole('button', { name: 'Tambah' }).click();
  });

  test('logout', async ({ page }) => {
    await page.waitForTimeout(5000);
    await page.goto('http://localhost:3001/dashboard');
    await page.getByRole('button', { name: 'Jhon' }).click();
    await page.getByRole('menuitem', { name: 'Log out' }).click();
    await expect(page).toHaveURL('http://localhost:3001');
  });
});
