const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const indexPath = path.join(__dirname, '..', 'index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');

test('Copy Alignment Audit: Must support baixa e media cilindrada multimarcas per owner feedback', () => {
  // Should mention baixa e média cilindrada
  assert.match(indexHtml, /baixa e média cilindrada/i, 'index.html must mention baixa e média cilindrada');
  assert.match(indexHtml, /multimarcas/i, 'index.html must mention multimarcas');

  // Should NOT lock description or checklist into specific models (Titan, Fan, Biz, Pop 110)
  assert.doesNotMatch(indexHtml, /Especialistas em Titan, Fan, Biz e Pop/i, 'Schema description must not restrict to specific models');
  assert.doesNotMatch(indexHtml, /Especialistas em motos populares: Titan, Fan, Biz e Pop 110/i, 'About checklist must not be restricted to Titan/Fan/Biz/Pop');
});

test('Copy Alignment Audit: Must offer both originais and paralelas parts per owner feedback', () => {
  // FAQ question must ask about originais ou paralelas
  assert.match(indexHtml, /Vocês trabalham com peças originais ou paralelas\?/i, 'FAQ question 3 should address originais ou paralelas');
  
  // Must explain both options are available for all budgets/tastes
  assert.match(indexHtml, /Trabalhamos com as duas opções para atender a todos os gostos/i, 'FAQ answer must state working with both original and parallel');
  
  // Must not claim only original parts
  assert.doesNotMatch(indexHtml, /trabalhamos apenas com/i, 'Must not claim working ONLY with original parts');

  // About checklist must mention both original and parallel options
  assert.match(indexHtml, /Peças originais e opções paralelas/i, 'About checklist must mention original and parallel options');
});

test('Copy Alignment Audit: Reviews and Gallery must not have hardcoded single-brand restriction tags', () => {
  assert.doesNotMatch(indexHtml, /Cliente Honda • Conceição do Coité/i, 'Review meta should be generic (Cliente • Conceição do Coité)');
  assert.doesNotMatch(indexHtml, /Cliente Yamaha • Olhos D'Água/i, 'Review meta should be generic (Cliente • Olhos D\'Água)');
  assert.match(indexHtml, /Originais e Paralelas/i, 'Gallery must mention both originais and paralelas');
});
