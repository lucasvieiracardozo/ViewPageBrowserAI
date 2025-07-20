# Git Flow Simplificado - Guia de Branching

## Estrutura de Branches

```
main (produção)
├── develop (desenvolvimento)
    ├── feature/nova-funcionalidade
    ├── feature/correcao-bug
    └── feature/melhoria-ui
```

## Branches Principais

- **`main`**: Branch de produção. Sempre estável e pronta para deploy.
- **`develop`**: Branch de desenvolvimento. Integra todas as features antes de ir para produção.
- **`feature/*`**: Branches temporárias para desenvolvimento de funcionalidades específicas.

## Comandos Essenciais

### 1. Configuração Inicial (uma vez apenas)

```bash
# Criar e trocar para branch develop
git checkout -b develop
git push -u origin develop

# Definir develop como branch padrão para pull requests
git branch --set-upstream-to=origin/develop develop
```

### 2. Criando uma Nova Feature

```bash
# Garantir que está na develop atualizada
git checkout develop
git pull origin develop

# Criar nova feature branch
git checkout -b feature/nome-da-funcionalidade

# Fazer commits normalmente
git add .
git commit -m "feat: implementar nova funcionalidade"

# Push da feature branch
git push -u origin feature/nome-da-funcionalidade
```

### 3. Finalizando Feature (Squash and Merge)

```bash
# Atualizar develop antes do merge
git checkout develop
git pull origin develop

# Voltar para feature e rebase (opcional, mas recomendado)
git checkout feature/nome-da-funcionalidade
git rebase develop

# Push final da feature
git push origin feature/nome-da-funcionalidade

# Fazer Pull Request no GitHub e usar "Squash and Merge"
# Ou via linha de comando:
git checkout develop
git merge --squash feature/nome-da-funcionalidade
git commit -m "feat: adicionar nova funcionalidade completa"
git push origin develop

# Deletar feature branch
git branch -d feature/nome-da-funcionalidade
git push origin --delete feature/nome-da-funcionalidade
```

### 4. Release para Produção

```bash
# Merge develop -> main
git checkout main
git pull origin main
git merge develop
git push origin main

# Tag da versão (opcional)
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

## Convenções de Commit

Use prefixos semânticos:

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação, sem mudança de lógica
- `refactor:` - Refatoração de código
- `test:` - Adição/correção de testes
- `chore:` - Tarefas de manutenção

## Exemplo Prático Completo

```bash
# 1. Começar nova feature
git checkout develop
git pull origin develop
git checkout -b feature/web-search-integration

# 2. Desenvolver e commitar
git add .
git commit -m "feat: adicionar módulo de busca web"
git add .
git commit -m "feat: integrar busca com chat AI"
git push -u origin feature/web-search-integration

# 3. Finalizar no GitHub (Pull Request + Squash and Merge)
# Ou via CLI:
git checkout develop
git pull origin develop
git merge --squash feature/web-search-integration
git commit -m "feat: implementar integração completa de busca web"
git push origin develop
git branch -d feature/web-search-integration
git push origin --delete feature/web-search-integration
```

## Dicas Importantes

1. **Sempre** trabalhe em feature branches, nunca diretamente na `develop` ou `main`
2. Use **Squash and Merge** para manter histórico limpo
3. Mantenha commits pequenos e descritivos durante desenvolvimento
4. Teste sempre antes de fazer merge para `develop`
5. `main` deve sempre estar deployável
