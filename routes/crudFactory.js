const express = require('express');
const store = require('../data/store');

function validId(rawId) {
  const id = Number(rawId);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function validate(config, body) {
  const values = {};
  const errors = [];

  for (const field of config.fields) {
    let value = String(body[field.name] ?? '').trim();
    if (field.required && !value) errors.push(`Preencha o campo "${field.label}".`);
    if (field.maxLength && value.length > field.maxLength) {
      errors.push(`O campo "${field.label}" deve ter no máximo ${field.maxLength} caracteres.`);
    }
    if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors.push(`Informe um e-mail válido no campo "${field.label}".`);
    }
    if (field.type === 'number' && value) {
      const normalized = value.replace(',', '.');
      const number = Number(normalized);
      if (!Number.isFinite(number)) {
        errors.push(`Informe um número válido no campo "${field.label}".`);
      } else if (field.min !== undefined && number < field.min) {
        errors.push(`O campo "${field.label}" não pode ser menor que ${field.min}.`);
      } else if (field.step === '1' && !Number.isInteger(number)) {
        errors.push(`O campo "${field.label}" deve ser um número inteiro.`);
      } else {
        value = number;
      }
    }
    values[field.name] = value;
  }

  return { values, errors };
}

function makeCrudRouter(config) {
  const router = express.Router();

  function renderForm(res, mode, formValues = {}, errors = [], status = 200) {
    return res.status(status).render('entities/form', {
      pageTitle: `${mode === 'edit' ? 'Editar' : 'Cadastrar'} ${config.singular}`,
      config,
      mode,
      formValues,
      errors
    });
  }

  router.get('/', async (req, res, next) => {
    try {
      const allRecords = await store.list(config.store);
      const query = String(req.query.q || '').trim();
      const normalizedQuery = query.toLocaleLowerCase('pt-BR');
      const records = normalizedQuery
        ? allRecords.filter((record) => Object.values(record).some((value) =>
            String(value ?? '').toLocaleLowerCase('pt-BR').includes(normalizedQuery)))
        : allRecords;

      res.render('entities/index', {
        pageTitle: config.title,
        config,
        records,
        query,
        success: req.query.sucesso ? String(req.query.sucesso) : '',
        notice: req.query.aviso ? String(req.query.aviso) : ''
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/cadastro', (req, res) => renderForm(res, 'create'));

  router.post('/', async (req, res, next) => {
    try {
      const { values, errors } = validate(config, req.body);
      if (errors.length) return renderForm(res, 'create', values, errors, 422);
      await store.create(config.store, values);
      return res.redirect(`${config.path}?sucesso=${encodeURIComponent(`${config.singular[0].toUpperCase()}${config.singular.slice(1)} cadastrado com sucesso.`)}`);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id/editar', async (req, res, next) => {
    try {
      const id = validId(req.params.id);
      if (!id) return res.status(404).render('errors/404', { message: `${config.singular} não encontrado.` });
      const record = await store.get(config.store, id);
      if (!record) return res.status(404).render('errors/404', { message: `${config.singular} não encontrado.` });
      return renderForm(res, 'edit', record);
    } catch (error) {
      next(error);
    }
  });

  router.post('/:id/editar', async (req, res, next) => {
    try {
      const id = validId(req.params.id);
      if (!id) return res.status(404).render('errors/404', { message: `${config.singular} não encontrado.` });
      const existing = await store.get(config.store, id);
      if (!existing) return res.status(404).render('errors/404', { message: `${config.singular} não encontrado.` });
      const { values, errors } = validate(config, req.body);
      if (errors.length) return renderForm(res, 'edit', { ...values, id }, errors, 422);
      const updated = await store.update(config.store, id, values);
      if (!updated) return res.status(404).render('errors/404', { message: `${config.singular} não encontrado.` });
      return res.redirect(`${config.path}?sucesso=${encodeURIComponent(`${config.singular[0].toUpperCase()}${config.singular.slice(1)} atualizado com sucesso.`)}`);
    } catch (error) {
      next(error);
    }
  });

  router.post('/:id/excluir', async (req, res, next) => {
    try {
      const id = validId(req.params.id);
      if (!id) return res.status(404).render('errors/404', { message: `${config.singular} não encontrado.` });
      const deleted = await store.remove(config.store, id);
      if (!deleted) return res.status(404).render('errors/404', { message: `${config.singular} não encontrado.` });
      return res.redirect(`${config.path}?sucesso=${encodeURIComponent(`${config.singular[0].toUpperCase()}${config.singular.slice(1)} excluído com sucesso.`)}`);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = makeCrudRouter;
