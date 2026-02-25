-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 25/02/2026 às 21:11
-- Versão do servidor: 11.8.3-MariaDB-log
-- Versão do PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `u502997195_AJULb`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `wp_jet_post_types`
--

CREATE TABLE `wp_jet_post_types` (
  `id` bigint(20) NOT NULL,
  `slug` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `labels` longtext DEFAULT NULL,
  `args` longtext DEFAULT NULL,
  `meta_fields` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Despejando dados para a tabela `wp_jet_post_types`
--

INSERT INTO `wp_jet_post_types` (`id`, `slug`, `status`, `labels`, `args`, `meta_fields`) VALUES
(1, 'produtos-prieto', 'publish', 'a:5:{s:4:\"name\";s:15:\"Produtos Prieto\";s:13:\"singular_name\";s:22:\"Adicionar novo produto\";s:7:\"add_new\";s:22:\"Adicionar novo produto\";s:12:\"add_new_item\";s:22:\"Adicionar novo produto\";s:14:\"featured_image\";s:14:\"Featured Image\";}', 'a:23:{s:6:\"public\";b:1;s:18:\"publicly_queryable\";b:1;s:7:\"show_ui\";b:1;s:12:\"show_in_menu\";b:1;s:17:\"show_in_nav_menus\";b:1;s:12:\"show_in_rest\";b:1;s:9:\"query_var\";b:1;s:7:\"rewrite\";b:1;s:12:\"map_meta_cap\";b:0;s:11:\"has_archive\";b:1;s:12:\"hierarchical\";b:0;s:19:\"exclude_from_search\";b:0;s:10:\"with_front\";b:0;s:14:\"show_edit_link\";b:0;s:16:\"hide_field_names\";b:0;s:15:\"delete_metadata\";b:0;s:12:\"rewrite_slug\";s:15:\"produtos-prieto\";s:15:\"capability_type\";s:4:\"post\";s:13:\"menu_position\";i:-1;s:9:\"menu_icon\";s:14:\"dashicons-cart\";s:8:\"supports\";a:2:{i:0;s:5:\"title\";i:1;s:9:\"thumbnail\";}s:13:\"admin_columns\";a:0:{}s:13:\"admin_filters\";a:0:{}}', 'a:6:{i:0;a:10:{s:5:\"title\";s:15:\"Nome do produto\";s:4:\"name\";s:8:\"_produto\";s:11:\"object_type\";s:5:\"field\";s:5:\"width\";s:4:\"100%\";s:7:\"options\";a:0:{}s:15:\"repeater-fields\";a:0:{}s:4:\"type\";s:4:\"text\";s:2:\"id\";i:8563;s:8:\"isNested\";b:0;s:14:\"options_source\";s:6:\"manual\";}i:1;a:10:{s:5:\"title\";s:7:\"Galeria\";s:4:\"name\";s:8:\"_galeria\";s:11:\"object_type\";s:5:\"field\";s:5:\"width\";s:4:\"100%\";s:7:\"options\";a:0:{}s:15:\"repeater-fields\";a:0:{}s:4:\"type\";s:5:\"media\";s:2:\"id\";i:8753;s:8:\"isNested\";b:0;s:14:\"options_source\";s:6:\"manual\";}i:2;a:11:{s:5:\"title\";s:27:\"Informações Nutricionais \";s:4:\"name\";s:5:\"_info\";s:11:\"object_type\";s:5:\"field\";s:5:\"width\";s:4:\"100%\";s:7:\"options\";a:0:{}s:15:\"repeater-fields\";a:0:{}s:4:\"type\";s:5:\"media\";s:2:\"id\";i:8872;s:8:\"isNested\";b:0;s:14:\"options_source\";s:6:\"manual\";s:12:\"value_format\";s:2:\"id\";}i:3;a:10:{s:5:\"title\";s:22:\"Descrição do produto\";s:4:\"name\";s:10:\"_descricao\";s:11:\"object_type\";s:5:\"field\";s:5:\"width\";s:3:\"50%\";s:7:\"options\";a:0:{}s:15:\"repeater-fields\";a:0:{}s:4:\"type\";s:4:\"text\";s:2:\"id\";i:9748;s:8:\"isNested\";b:0;s:14:\"options_source\";s:6:\"manual\";}i:4;a:10:{s:5:\"title\";s:17:\"Categorias PRIETO\";s:4:\"name\";s:17:\"_categoriasprieto\";s:11:\"object_type\";s:5:\"field\";s:5:\"width\";s:4:\"100%\";s:7:\"options\";a:7:{i:0;a:3:{s:3:\"key\";s:8:\"Salgados\";s:5:\"value\";s:8:\"Salgados\";s:2:\"id\";i:3623;}i:1;a:3:{s:3:\"key\";s:17:\"Cortes Temperados\";s:5:\"value\";s:17:\"Cortes Temperados\";s:2:\"id\";i:6891;}i:2;a:3:{s:3:\"key\";s:16:\"Cortes Defumados\";s:5:\"value\";s:16:\"Cortes Defumados\";s:2:\"id\";i:8057;}i:3;a:3:{s:3:\"key\";s:19:\"Embutidos defumados\";s:5:\"value\";s:19:\"Embutidos defumados\";s:2:\"id\";i:3021;}i:4;a:3:{s:3:\"key\";s:9:\"Embutidos\";s:5:\"value\";s:9:\"Embutidos\";s:2:\"id\";i:4175;}i:5;a:3:{s:3:\"key\";s:18:\"Linguica Temperada\";s:5:\"value\";s:18:\"Linguica Temperada\";s:2:\"id\";i:2382;}i:6;a:3:{s:3:\"key\";s:9:\"Natalinos\";s:5:\"value\";s:9:\"Natalinos\";s:2:\"id\";i:4831;}}s:15:\"repeater-fields\";a:0:{}s:4:\"type\";s:6:\"select\";s:2:\"id\";i:3647;s:8:\"isNested\";b:0;s:14:\"options_source\";s:6:\"manual\";}i:5;a:10:{s:5:\"title\";s:3:\"SKU\";s:4:\"name\";s:4:\"_sku\";s:11:\"object_type\";s:5:\"field\";s:5:\"width\";s:3:\"50%\";s:7:\"options\";a:0:{}s:15:\"repeater-fields\";a:0:{}s:4:\"type\";s:6:\"number\";s:2:\"id\";i:2611;s:8:\"isNested\";b:0;s:14:\"options_source\";s:6:\"manual\";}}'),
(5, 'receitas', 'publish', 'a:1:{s:4:\"name\";s:8:\"Receitas\";}', 'a:23:{s:6:\"public\";b:1;s:18:\"publicly_queryable\";b:1;s:7:\"show_ui\";b:1;s:12:\"show_in_menu\";b:1;s:17:\"show_in_nav_menus\";b:1;s:12:\"show_in_rest\";b:1;s:9:\"query_var\";b:1;s:7:\"rewrite\";b:1;s:12:\"map_meta_cap\";b:0;s:11:\"has_archive\";b:1;s:12:\"hierarchical\";b:0;s:19:\"exclude_from_search\";b:0;s:10:\"with_front\";b:0;s:14:\"show_edit_link\";b:0;s:16:\"hide_field_names\";b:0;s:15:\"delete_metadata\";b:0;s:12:\"rewrite_slug\";s:8:\"receitas\";s:15:\"capability_type\";s:4:\"post\";s:13:\"menu_position\";i:-1;s:9:\"menu_icon\";s:25:\"dashicons-format-standard\";s:8:\"supports\";a:2:{i:0;s:5:\"title\";i:1;s:6:\"editor\";}s:13:\"admin_columns\";a:0:{}s:13:\"admin_filters\";a:0:{}}', 'a:4:{i:0;a:10:{s:5:\"title\";s:15:\"Nome da raceita\";s:4:\"name\";s:11:\"nomereceita\";s:11:\"object_type\";s:5:\"field\";s:5:\"width\";s:3:\"75%\";s:7:\"options\";a:0:{}s:15:\"repeater-fields\";a:0:{}s:4:\"type\";s:4:\"text\";s:2:\"id\";i:1882;s:8:\"isNested\";b:0;s:14:\"options_source\";s:6:\"manual\";}i:1;a:11:{s:5:\"title\";s:16:\"Thumb da receita\";s:4:\"name\";s:5:\"thumb\";s:11:\"object_type\";s:5:\"field\";s:5:\"width\";s:3:\"75%\";s:7:\"options\";a:0:{}s:15:\"repeater-fields\";a:0:{}s:4:\"type\";s:5:\"media\";s:2:\"id\";i:2095;s:8:\"isNested\";b:0;s:14:\"options_source\";s:6:\"manual\";s:12:\"value_format\";s:2:\"id\";}i:2;a:11:{s:5:\"title\";s:12:\"Ingredientes\";s:4:\"name\";s:12:\"ingredientes\";s:11:\"object_type\";s:5:\"field\";s:5:\"width\";s:3:\"75%\";s:7:\"options\";a:0:{}s:15:\"repeater-fields\";a:0:{}s:4:\"type\";s:4:\"text\";s:9:\"collapsed\";b:0;s:2:\"id\";i:3921;s:8:\"isNested\";b:0;s:14:\"options_source\";s:6:\"manual\";}i:3;a:11:{s:5:\"title\";s:15:\"Modo de preparo\";s:4:\"name\";s:7:\"preparo\";s:11:\"object_type\";s:5:\"field\";s:5:\"width\";s:3:\"75%\";s:7:\"options\";a:0:{}s:15:\"repeater-fields\";a:0:{}s:4:\"type\";s:4:\"text\";s:9:\"collapsed\";b:0;s:2:\"id\";i:7906;s:8:\"isNested\";b:0;s:14:\"options_source\";s:6:\"manual\";}}'),
(3, NULL, 'query', 'a:1:{s:4:\"name\";s:8:\"postgrid\";}', 'a:17:{s:10:\"query_type\";s:5:\"posts\";s:5:\"posts\";a:6:{s:7:\"orderby\";a:0:{}s:10:\"meta_query\";a:0:{}s:9:\"tax_query\";a:0:{}s:10:\"date_query\";a:0:{}s:9:\"post_type\";a:1:{i:0;s:15:\"produtos-prieto\";}s:14:\"posts_per_page\";s:1:\"7\";}s:15:\"__dynamic_posts\";a:3:{s:10:\"meta_query\";a:0:{}s:9:\"tax_query\";a:0:{}s:10:\"date_query\";a:0:{}}s:12:\"show_preview\";b:0;s:11:\"cache_query\";b:1;s:12:\"api_endpoint\";b:0;s:12:\"preview_page\";N;s:18:\"preview_page_title\";N;s:20:\"preview_query_string\";N;s:8:\"query_id\";N;s:11:\"description\";N;s:13:\"api_namespace\";N;s:8:\"api_path\";N;s:10:\"api_access\";N;s:14:\"api_access_cap\";N;s:15:\"api_access_role\";a:0:{}s:10:\"api_schema\";a:1:{i:0;a:2:{s:3:\"arg\";s:0:\"\";s:5:\"value\";s:0:\"\";}}}', 'a:0:{}'),
(2, '_clientes', 'publish', 'a:1:{s:4:\"name\";s:8:\"Clientes\";}', 'a:23:{s:6:\"public\";b:1;s:18:\"publicly_queryable\";b:1;s:7:\"show_ui\";b:1;s:12:\"show_in_menu\";b:1;s:17:\"show_in_nav_menus\";b:1;s:12:\"show_in_rest\";b:1;s:9:\"query_var\";b:1;s:7:\"rewrite\";b:1;s:12:\"map_meta_cap\";b:0;s:11:\"has_archive\";b:1;s:12:\"hierarchical\";b:0;s:19:\"exclude_from_search\";b:0;s:10:\"with_front\";b:0;s:14:\"show_edit_link\";b:0;s:16:\"hide_field_names\";b:0;s:15:\"delete_metadata\";b:0;s:12:\"rewrite_slug\";s:9:\"_clientes\";s:15:\"capability_type\";s:4:\"post\";s:13:\"menu_position\";i:-1;s:9:\"menu_icon\";s:25:\"dashicons-format-standard\";s:8:\"supports\";a:2:{i:0;s:5:\"title\";i:1;s:6:\"editor\";}s:13:\"admin_columns\";a:0:{}s:13:\"admin_filters\";a:0:{}}', 'a:3:{i:0;a:13:{s:5:\"title\";s:13:\"Localização\";s:4:\"name\";s:6:\"_local\";s:11:\"object_type\";s:5:\"field\";s:5:\"width\";s:3:\"50%\";s:7:\"options\";a:0:{}s:15:\"repeater-fields\";a:0:{}s:4:\"type\";s:3:\"map\";s:9:\"collapsed\";b:0;s:2:\"id\";i:2047;s:8:\"isNested\";b:0;s:14:\"options_source\";s:6:\"manual\";s:11:\"description\";s:29:\"Insira o endereço do cliente\";s:12:\"show_in_rest\";s:0:\"\";}i:1;a:12:{s:5:\"title\";s:15:\"Nome do cliente\";s:4:\"name\";s:12:\"_nomecliente\";s:11:\"object_type\";s:5:\"field\";s:5:\"width\";s:3:\"50%\";s:7:\"options\";a:0:{}s:15:\"repeater-fields\";a:0:{}s:4:\"type\";s:4:\"text\";s:9:\"collapsed\";b:0;s:2:\"id\";i:4247;s:8:\"isNested\";b:0;s:14:\"options_source\";s:6:\"manual\";s:11:\"description\";s:24:\"Insira o nome do cliente\";}i:2;a:11:{s:5:\"title\";s:4:\"Foto\";s:4:\"name\";s:12:\"_fotocliente\";s:11:\"object_type\";s:5:\"field\";s:5:\"width\";s:3:\"50%\";s:7:\"options\";a:0:{}s:15:\"repeater-fields\";a:0:{}s:4:\"type\";s:5:\"media\";s:9:\"collapsed\";b:0;s:2:\"id\";i:6924;s:8:\"isNested\";b:0;s:14:\"options_source\";s:6:\"manual\";}}'),
(4, NULL, 'query', 'a:1:{s:4:\"name\";s:14:\"_menucategoria\";}', 'a:17:{s:10:\"query_type\";s:5:\"terms\";s:5:\"terms\";a:3:{s:10:\"meta_query\";a:0:{}s:7:\"exclude\";s:92:\"cortes-def, cortes-suinos-temp, embut-cozid, embut-defum, ling-defu, ling-temp, jerkeed-beef\";s:8:\"taxonomy\";a:1:{i:0;s:5:\"tipos\";}}s:15:\"__dynamic_terms\";a:1:{s:10:\"meta_query\";a:0:{}}s:12:\"show_preview\";b:0;s:11:\"cache_query\";b:1;s:12:\"api_endpoint\";b:0;s:12:\"preview_page\";N;s:18:\"preview_page_title\";N;s:20:\"preview_query_string\";N;s:8:\"query_id\";s:14:\"_menucategoria\";s:11:\"description\";N;s:13:\"api_namespace\";N;s:8:\"api_path\";N;s:10:\"api_access\";N;s:14:\"api_access_cap\";N;s:15:\"api_access_role\";N;s:10:\"api_schema\";N;}', 'a:0:{}');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `wp_jet_post_types`
--
ALTER TABLE `wp_jet_post_types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `wp_jet_post_types`
--
ALTER TABLE `wp_jet_post_types`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
