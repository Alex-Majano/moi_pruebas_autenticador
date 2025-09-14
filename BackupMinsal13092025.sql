--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-09-13 16:21:58

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 18364)
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- TOC entry 4981 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


--
-- TOC entry 863 (class 1247 OID 16410)
-- Name: _mnt_rol_user; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public._mnt_rol_user (
    INTERNALLENGTH = variable,
    INPUT = array_in,
    OUTPUT = array_out,
    RECEIVE = array_recv,
    SEND = array_send,
    ANALYZE = array_typanalyze,
    SUBSCRIPT = array_subscript_handler,
    ELEMENT = ???,
    CATEGORY = 'A',
    ALIGNMENT = double,
    STORAGE = extended
);


ALTER TYPE public._mnt_rol_user OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 18371)
-- Name: bit_log_errores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bit_log_errores (
    id text NOT NULL,
    error text NOT NULL,
    url text NOT NULL,
    params text,
    body text,
    query text,
    method character varying(20),
    ip character varying(100) NOT NULL,
    fecha_hora timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    id_usuario text
);


ALTER TABLE public.bit_log_errores OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 18378)
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 18383)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- TOC entry 4982 (class 0 OID 0)
-- Dependencies: 220
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 221 (class 1259 OID 18384)
-- Name: mnt_etiquetas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mnt_etiquetas (
    id text NOT NULL,
    nombre character varying(100) NOT NULL,
    icono character varying(50) NOT NULL,
    descripcion text,
    visible boolean DEFAULT true,
    activo boolean DEFAULT true,
    prioridad integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.mnt_etiquetas OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 18393)
-- Name: mnt_menu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mnt_menu (
    id text NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    visible boolean,
    activo boolean,
    icono character varying(100) NOT NULL,
    filename character varying(150) NOT NULL,
    admin boolean,
    super_admin boolean,
    prioridad integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    id_etiqueta text
);


ALTER TABLE public.mnt_menu OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 18400)
-- Name: mnt_modulos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mnt_modulos (
    id text NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    visible boolean DEFAULT true,
    activo boolean DEFAULT true,
    icono character varying(100),
    filename character varying(150) NOT NULL,
    method character varying(10),
    is_father boolean,
    prioridad integer,
    frontend boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    id_padre text,
    id_menu text
);


ALTER TABLE public.mnt_modulos OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 18410)
-- Name: mnt_permisos_modulos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mnt_permisos_modulos (
    id text NOT NULL,
    id_modulo_visa text NOT NULL,
    id_modulo_endpoint text NOT NULL
);


ALTER TABLE public.mnt_permisos_modulos OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 18415)
-- Name: mnt_permisos_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mnt_permisos_roles (
    id text NOT NULL,
    asignado_especial boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id_modulo text NOT NULL,
    id_rol text NOT NULL
);


ALTER TABLE public.mnt_permisos_roles OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 18423)
-- Name: mnt_permisos_usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mnt_permisos_usuarios (
    id text NOT NULL,
    asignado_especial boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id_modulo text NOT NULL,
    id_usuario text
);


ALTER TABLE public.mnt_permisos_usuarios OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 18431)
-- Name: mnt_restore_account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mnt_restore_account (
    id text NOT NULL,
    date_time_expiration timestamp with time zone NOT NULL,
    ip character varying(100) NOT NULL,
    link_restore text NOT NULL,
    token_restore text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    id_user text NOT NULL
);


ALTER TABLE public.mnt_restore_account OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 18439)
-- Name: mnt_rol_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mnt_rol_user (
    id text NOT NULL,
    nombre character varying(50) NOT NULL,
    descripcion character varying(250),
    activo boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.mnt_rol_user OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 18447)
-- Name: mnt_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mnt_tokens (
    id text NOT NULL,
    token text NOT NULL,
    expiration_time timestamp with time zone NOT NULL,
    refresh_token text,
    refresh_expiration_time timestamp with time zone,
    active boolean,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    deleted_at timestamp with time zone,
    id_user text NOT NULL
);


ALTER TABLE public.mnt_tokens OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 18454)
-- Name: mnt_usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mnt_usuarios (
    id text NOT NULL,
    email character varying(100),
    password text NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    id_rol text NOT NULL,
    two_factor_secret text,
    is_2fa_enabled boolean DEFAULT false
);


ALTER TABLE public.mnt_usuarios OWNER TO postgres;

--
-- TOC entry 4750 (class 2604 OID 18462)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 4963 (class 0 OID 18371)
-- Dependencies: 218
-- Data for Name: bit_log_errores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bit_log_errores (id, error, url, params, body, query, method, ip, fecha_hora, created_at, updated_at, deleted_at, id_usuario) FROM stdin;
\.


--
-- TOC entry 4964 (class 0 OID 18378)
-- Dependencies: 219
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1736951101346	InitTables1736951101346
\.


--
-- TOC entry 4966 (class 0 OID 18384)
-- Dependencies: 221
-- Data for Name: mnt_etiquetas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mnt_etiquetas (id, nombre, icono, descripcion, visible, activo, prioridad, created_at, updated_at, deleted_at) FROM stdin;
8f0e1095-5bfa-4ad7-b7a3-1ea746599b8a	Administración		\N	t	t	4	2025-01-15 08:48:53.609905-06	2025-01-15 08:48:53.609905-06	\N
b86afd7e-dfe4-4d9b-b37e-98795a216a17	Catálogos		\N	f	t	6	2025-01-15 09:25:09.555442-06	2025-01-15 09:25:09.555442-06	\N
\.


--
-- TOC entry 4967 (class 0 OID 18393)
-- Dependencies: 222
-- Data for Name: mnt_menu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mnt_menu (id, nombre, descripcion, visible, activo, icono, filename, admin, super_admin, prioridad, created_at, updated_at, deleted_at, id_etiqueta) FROM stdin;
d28a0726-005d-476d-959f-c997bbde53f9	Usuarios	\N	t	t		#	\N	\N	0	2025-01-15 08:50:50-06	2025-01-15 08:50:50.974073-06	\N	8f0e1095-5bfa-4ad7-b7a3-1ea746599b8a
1bb69556-9de0-4ca4-aac0-f347a2591e13	Tipos de usuarios	\N	t	t		#	\N	\N	0	2025-01-15 09:26:53-06	2025-01-15 09:26:53.51158-06	\N	8f0e1095-5bfa-4ad7-b7a3-1ea746599b8a
98064b3f-3509-4b93-90a0-3e38a837f8ba	Permisos del sistema	\N	t	t		#	\N	\N	1	2025-01-15 09:57:22-06	2025-01-15 09:57:22.167681-06	\N	8f0e1095-5bfa-4ad7-b7a3-1ea746599b8a
\.


--
-- TOC entry 4968 (class 0 OID 18400)
-- Dependencies: 223
-- Data for Name: mnt_modulos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mnt_modulos (id, nombre, descripcion, visible, activo, icono, filename, method, is_father, prioridad, frontend, created_at, updated_at, deleted_at, id_padre, id_menu) FROM stdin;
74a28bb4-6bff-4463-bace-072b3f996c0e	Administrar gestión de usuarios	\N	t	t		/usuarios	\N	t	1	t	2025-01-15 09:01:14-06	2025-01-15 09:01:14.290944-06	\N	\N	d28a0726-005d-476d-959f-c997bbde53f9
fd033e2b-1443-4717-a9ae-0691bb107bab	Administrar tipos de usuarios	\N	t	t		/tipos/usuarios	\N	t	0	t	2025-01-15 09:28:42-06	2025-01-15 09:28:42.245482-06	\N	\N	1bb69556-9de0-4ca4-aac0-f347a2591e13
4b50d7ea-70cc-4005-b18e-2b04e0b88f6b	get rols	\N	f	f		/rols	GET	f	1	f	2025-01-15 09:31:01-06	2025-01-15 09:31:01.723943-06	\N	fd033e2b-1443-4717-a9ae-0691bb107bab	1bb69556-9de0-4ca4-aac0-f347a2591e13
fd95ed1d-85c2-40fb-9f0c-d3d569707bdd	get one rol	\N	f	f		/rols/:id	GET	f	2	f	2025-01-15 09:31:14-06	2025-01-15 09:31:14.071778-06	\N	fd033e2b-1443-4717-a9ae-0691bb107bab	1bb69556-9de0-4ca4-aac0-f347a2591e13
9dfaf4d3-cbbf-4340-aaf4-7a4fc31c01bf	get permisos modulos rol	\N	f	f		/rols/permisos-modulos/:id	GET	f	3	f	2025-01-15 09:31:41-06	2025-01-15 09:31:41.365727-06	\N	fd033e2b-1443-4717-a9ae-0691bb107bab	1bb69556-9de0-4ca4-aac0-f347a2591e13
7526d495-3efd-4210-bfe4-f9f42a7c8faa	create permisos modulos rol	\N	f	f		/rols/permisos-modulos	POST	f	4	f	2025-01-15 09:32:21-06	2025-01-15 09:32:21.828479-06	\N	fd033e2b-1443-4717-a9ae-0691bb107bab	1bb69556-9de0-4ca4-aac0-f347a2591e13
bd16aaa6-e364-44c0-b2f8-d3c67f3edee3	get usuarios	\N	f	f		/usuarios	GET	f	0	f	2025-01-15 09:03:16-06	2025-01-15 09:03:16.394649-06	\N	74a28bb4-6bff-4463-bace-072b3f996c0e	d28a0726-005d-476d-959f-c997bbde53f9
30b544da-e87e-4461-9dd9-695aeb601b83	get one usuario	\N	f	f		/usuarios/:id	GET	f	1	f	2025-01-15 09:05:21-06	2025-01-15 09:05:21.738457-06	\N	74a28bb4-6bff-4463-bace-072b3f996c0e	d28a0726-005d-476d-959f-c997bbde53f9
c883cf2e-4d47-4ae1-af65-1df1d7ac1df1	get permisos modulos usuario	\N	f	f		/usuarios/permisos-modulos/:id	GET	f	2	f	2025-01-15 09:06:02-06	2025-01-15 09:06:02.27361-06	\N	74a28bb4-6bff-4463-bace-072b3f996c0e	d28a0726-005d-476d-959f-c997bbde53f9
88ebbe74-b8d0-4e87-8a59-a70dda067980	update usuario	\N	f	f		/usuarios/:id	PUT	f	3	f	2025-01-15 09:06:32-06	2025-01-15 09:06:32.797775-06	\N	74a28bb4-6bff-4463-bace-072b3f996c0e	d28a0726-005d-476d-959f-c997bbde53f9
43d6ba8f-6d13-4963-94f7-e462ac4ed547	create usuario	\N	f	f		/usuarios/:id	POST	f	4	f	2025-01-15 09:06:49-06	2025-01-15 09:06:49.570212-06	\N	74a28bb4-6bff-4463-bace-072b3f996c0e	d28a0726-005d-476d-959f-c997bbde53f9
22c10dd3-ebc6-4b62-b1df-1a1686c0c139	create permisos modulos usuario	\N	f	f		/usuarios/permisos-modulos	POST	f	5	f	2025-01-15 09:08:19-06	2025-01-15 09:08:19.146502-06	\N	74a28bb4-6bff-4463-bace-072b3f996c0e	d28a0726-005d-476d-959f-c997bbde53f9
0eaba199-d381-47d4-b9e2-ed54465282f6	delete usuario	\N	f	f		/usuarios/:id	DELETE	f	6	f	2025-01-15 09:08:46-06	2025-01-15 09:08:46.435652-06	\N	74a28bb4-6bff-4463-bace-072b3f996c0e	d28a0726-005d-476d-959f-c997bbde53f9
927394d7-4baf-47ee-a84c-65f091f8f0bf	Administrar permisos del sistema	\N	f	t		/administrar/permisos-modulos	GET	f	5	t	2025-01-15 09:58:15-06	2025-01-15 09:58:15.698381-06	\N	\N	98064b3f-3509-4b93-90a0-3e38a837f8ba
\.


--
-- TOC entry 4969 (class 0 OID 18410)
-- Dependencies: 224
-- Data for Name: mnt_permisos_modulos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mnt_permisos_modulos (id, id_modulo_visa, id_modulo_endpoint) FROM stdin;
250f82a7-6ab6-42be-ab89-e833f4b23917	74a28bb4-6bff-4463-bace-072b3f996c0e	bd16aaa6-e364-44c0-b2f8-d3c67f3edee3
d3acf780-948b-4102-930c-36ded383e5df	74a28bb4-6bff-4463-bace-072b3f996c0e	88ebbe74-b8d0-4e87-8a59-a70dda067980
03016114-0544-4f83-8001-76219efba0c3	74a28bb4-6bff-4463-bace-072b3f996c0e	43d6ba8f-6d13-4963-94f7-e462ac4ed547
269dd795-8689-4f17-baec-698146655419	74a28bb4-6bff-4463-bace-072b3f996c0e	22c10dd3-ebc6-4b62-b1df-1a1686c0c139
81076bcf-8414-4cb4-ac36-821de2786446	74a28bb4-6bff-4463-bace-072b3f996c0e	0eaba199-d381-47d4-b9e2-ed54465282f6
24e012d5-ee4b-4cee-a85c-6c619b33dce8	fd033e2b-1443-4717-a9ae-0691bb107bab	4b50d7ea-70cc-4005-b18e-2b04e0b88f6b
efe556ed-70a5-4f3c-92d0-f179ba0e8757	fd033e2b-1443-4717-a9ae-0691bb107bab	fd95ed1d-85c2-40fb-9f0c-d3d569707bdd
5cde6aa4-9831-4d68-983e-2e27902b992d	927394d7-4baf-47ee-a84c-65f091f8f0bf	22c10dd3-ebc6-4b62-b1df-1a1686c0c139
8b1c9b9b-581d-49fe-bcee-f13f5c4fa4ef	927394d7-4baf-47ee-a84c-65f091f8f0bf	c883cf2e-4d47-4ae1-af65-1df1d7ac1df1
3572b005-f0cc-4a33-9097-1ab2c061419e	927394d7-4baf-47ee-a84c-65f091f8f0bf	7526d495-3efd-4210-bfe4-f9f42a7c8faa
86cdaec7-f6ff-4455-b5c6-82807ba43297	927394d7-4baf-47ee-a84c-65f091f8f0bf	9dfaf4d3-cbbf-4340-aaf4-7a4fc31c01bf
\.


--
-- TOC entry 4970 (class 0 OID 18415)
-- Dependencies: 225
-- Data for Name: mnt_permisos_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mnt_permisos_roles (id, asignado_especial, created_at, updated_at, id_modulo, id_rol) FROM stdin;
b4a7236d-a765-417b-89dc-e605a95c9861	f	2025-01-15 09:40:41-06	2025-01-15 09:40:41.820962-06	74a28bb4-6bff-4463-bace-072b3f996c0e	1
f6b6189f-1311-4e58-9e1e-658c116842c4	f	2025-01-15 09:40:41-06	2025-01-15 09:40:41.820962-06	fd033e2b-1443-4717-a9ae-0691bb107bab	1
ff34a492-a9b6-4f35-9a46-71207f5b33db	f	2025-01-15 09:40:41-06	2025-01-15 09:40:41.820962-06	0eaba199-d381-47d4-b9e2-ed54465282f6	1
83c4b5fb-ab0a-487a-ba7f-c1c2ea9d4c2d	f	2025-01-15 09:40:41-06	2025-01-15 09:40:41.820962-06	22c10dd3-ebc6-4b62-b1df-1a1686c0c139	1
2ff979d9-83d1-4d3d-881b-3fee03600816	f	2025-01-15 09:40:41-06	2025-01-15 09:40:41.820962-06	30b544da-e87e-4461-9dd9-695aeb601b83	1
67a41ad0-ece5-4c0e-bfa7-376815012764	f	2025-01-15 09:40:41-06	2025-01-15 09:40:41.820962-06	43d6ba8f-6d13-4963-94f7-e462ac4ed547	1
2ec47a92-38a2-475d-8ada-bb45e18a73e7	f	2025-01-15 09:40:41-06	2025-01-15 09:40:41.820962-06	88ebbe74-b8d0-4e87-8a59-a70dda067980	1
95fd3c73-6213-42c0-9746-e8eaaed6c82a	f	2025-01-15 09:40:41-06	2025-01-15 09:40:41.820962-06	bd16aaa6-e364-44c0-b2f8-d3c67f3edee3	1
45f1643d-f085-4f1f-a056-7a5e4291ef75	f	2025-01-15 09:40:41-06	2025-01-15 09:40:41.820962-06	c883cf2e-4d47-4ae1-af65-1df1d7ac1df1	1
68c6409e-bca9-402a-800c-f26eb5c556a3	f	2025-01-15 09:40:41-06	2025-01-15 09:40:41.820962-06	4b50d7ea-70cc-4005-b18e-2b04e0b88f6b	1
1de2a918-db16-4cca-a32f-9969fcaee930	f	2025-01-15 09:40:41-06	2025-01-15 09:40:41.820962-06	7526d495-3efd-4210-bfe4-f9f42a7c8faa	1
ff7431aa-e296-4042-b70d-c79aacb29253	f	2025-01-15 09:40:41-06	2025-01-15 09:40:41.820962-06	9dfaf4d3-cbbf-4340-aaf4-7a4fc31c01bf	1
0cced8db-8279-42eb-a7e5-a48fe81361d9	f	2025-01-15 09:40:41-06	2025-01-15 09:40:41.820962-06	fd95ed1d-85c2-40fb-9f0c-d3d569707bdd	1
\.


--
-- TOC entry 4971 (class 0 OID 18423)
-- Dependencies: 226
-- Data for Name: mnt_permisos_usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mnt_permisos_usuarios (id, asignado_especial, created_at, updated_at, id_modulo, id_usuario) FROM stdin;
21bdbbe5-1ebd-4f82-9af5-2f11252dfd0b	f	2025-01-15 10:11:10-06	2025-01-15 10:11:10.957248-06	74a28bb4-6bff-4463-bace-072b3f996c0e	1
f00b1e7f-5691-44d1-b176-3e26b36c35d2	f	2025-01-15 10:11:10-06	2025-01-15 10:11:10.957248-06	fd033e2b-1443-4717-a9ae-0691bb107bab	1
4a8995c8-5bd9-4674-9088-b07bb526cf90	t	2025-01-15 10:11:10-06	2025-01-15 10:11:10.957248-06	927394d7-4baf-47ee-a84c-65f091f8f0bf	1
4885b0a1-59ab-4262-8239-3b9bb7c3e242	f	2025-01-15 10:11:10-06	2025-01-15 10:11:10.957248-06	0eaba199-d381-47d4-b9e2-ed54465282f6	1
c6f6e0c0-6ae8-4730-b425-f8914ec9e4d2	f	2025-01-15 10:11:10-06	2025-01-15 10:11:10.957248-06	22c10dd3-ebc6-4b62-b1df-1a1686c0c139	1
f35da443-fab6-4756-b683-3623736f4b2b	f	2025-01-15 10:11:10-06	2025-01-15 10:11:10.957248-06	43d6ba8f-6d13-4963-94f7-e462ac4ed547	1
c13ac605-d0b3-4ceb-908e-f3801842cfbc	f	2025-01-15 10:11:10-06	2025-01-15 10:11:10.957248-06	88ebbe74-b8d0-4e87-8a59-a70dda067980	1
2eebb68a-188a-4d8f-ba05-02f869182637	f	2025-01-15 10:11:10-06	2025-01-15 10:11:10.957248-06	bd16aaa6-e364-44c0-b2f8-d3c67f3edee3	1
526237b0-47cc-4878-92cd-f7a301e323b4	f	2025-01-15 10:11:10-06	2025-01-15 10:11:10.957248-06	4b50d7ea-70cc-4005-b18e-2b04e0b88f6b	1
849a1230-5945-4490-a295-67c485a504fd	f	2025-01-15 10:11:10-06	2025-01-15 10:11:10.957248-06	fd95ed1d-85c2-40fb-9f0c-d3d569707bdd	1
be049a26-3feb-49bf-b015-fd509ed1a0a8	f	2025-01-15 10:11:10-06	2025-01-15 10:11:10.957248-06	22c10dd3-ebc6-4b62-b1df-1a1686c0c139	1
aa2b4917-ef3e-4522-95a6-3c190cbb3ddd	f	2025-01-15 10:11:10-06	2025-01-15 10:11:10.957248-06	7526d495-3efd-4210-bfe4-f9f42a7c8faa	1
958c7a18-c7eb-4a0d-ac1d-fab1a84351f6	f	2025-01-15 10:11:10-06	2025-01-15 10:11:10.957248-06	9dfaf4d3-cbbf-4340-aaf4-7a4fc31c01bf	1
58e95255-2f4b-4f60-9ef6-f00827dec591	f	2025-01-15 10:11:10-06	2025-01-15 10:11:10.957248-06	c883cf2e-4d47-4ae1-af65-1df1d7ac1df1	1
\.


--
-- TOC entry 4972 (class 0 OID 18431)
-- Dependencies: 227
-- Data for Name: mnt_restore_account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mnt_restore_account (id, date_time_expiration, ip, link_restore, token_restore, active, created_at, updated_at, deleted_at, id_user) FROM stdin;
\.


--
-- TOC entry 4973 (class 0 OID 18439)
-- Dependencies: 228
-- Data for Name: mnt_rol_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mnt_rol_user (id, nombre, descripcion, activo, created_at, updated_at, deleted_at) FROM stdin;
1	Administrator	\N	t	2025-07-26 22:47:34-06	2025-07-26 22:47:34.625183-06	\N
\.


--
-- TOC entry 4974 (class 0 OID 18447)
-- Dependencies: 229
-- Data for Name: mnt_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mnt_tokens (id, token, expiration_time, refresh_token, refresh_expiration_time, active, created_at, updated_at, deleted_at, id_user) FROM stdin;
62c8b231-e62f-4eac-b658-934035ba7676	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjFUMDM6MDg6MzMuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yMVQwMzowODozMy4xOTJaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1MzA2ODYzMSwiZXhwIjoxNzUzMDcyMjMxfQ.ylOHRY1w6whtza-587pGlfWj6XKqt3GSkv6WnGp9JOY	2025-07-20 22:30:31-06	\N	\N	f	2025-07-20 21:30:32-06	2025-07-26 23:00:34.091762-06	\N	1
fb0c7c6f-5aa1-49a7-ad27-61e22dd6a928	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1MzU5MjQzNCwiZXhwIjoxNzUzNTk2MDM0fQ.mGX5VrszutQJq26Ss6MD1sNm4ycywj1_FxkwdLbGtOg	2025-07-27 00:00:34-06	\N	\N	f	2025-07-26 23:00:34-06	2025-07-28 08:20:03.364805-06	\N	1
ce28961e-0ec2-4ddf-97e6-def3e0f9e7c8	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1MzcxMjQwMywiZXhwIjoxNzUzNzE2MDAzfQ.wau6sm-awu7f6zYSlIEtUIdflFRiK6QUcVP__H4rLys	2025-07-28 09:20:03-06	\N	\N	f	2025-07-28 08:20:03-06	2025-07-28 08:20:18.7729-06	\N	1
0de5f6d7-29fb-4ba3-b47f-58074a0d76d3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1MzcxMjQxOCwiZXhwIjoxNzUzNzE2MDE4fQ.8_Y8s4QuOUb8t7GMliZhK6mKnjfKy3j2Qu-Sum9z9j8	2025-07-28 09:20:18-06	\N	\N	f	2025-07-28 08:20:18-06	2025-07-31 14:49:15.897513-06	\N	1
01f72f16-7e4d-4a91-8abc-9526bd2d37db	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1Mzk5NDk1NSwiZXhwIjoxNzUzOTk4NTU1fQ.69b3K5ncfFTDAqhI0p65-7YQGM7C_d2zeJdb3U5_HZc	2025-07-31 15:49:15-06	\N	\N	f	2025-07-31 14:49:15-06	2025-08-08 17:11:55.650399-06	\N	1
4c7fb7e1-23f0-4a62-b4a2-e749eccd17bf	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1NDY5NDcxNSwiZXhwIjoxNzU0Njk4MzE1fQ.kyKKLt1CzFDx6RYHbBxZGSV2MubapSQ4jbXvzL-72Uc	2025-08-08 18:11:55-06	\N	\N	f	2025-08-08 17:11:55-06	2025-08-10 12:04:16.525949-06	\N	1
ff8bd1da-b4e6-4fd8-87dd-902ec32a49f4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1NDg0OTA1NiwiZXhwIjoxNzU0ODUyNjU2fQ.5PM-Ocb6gqdlFzXgjSfJu1d1AjMtneFgdlxIT8_mwqk	2025-08-10 13:04:16-06	\N	\N	f	2025-08-10 12:04:16-06	2025-08-22 08:22:15.024166-06	\N	1
873740ca-8ca4-4b64-83b4-4a873b271631	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1NTg3MjUzNSwiZXhwIjoxNzU1ODc2MTM1fQ.1Sf3zlqCwRnmBtr6mHGqLq8vriYbFnBcQqqwSagu87Q	2025-08-22 09:22:15-06	\N	\N	f	2025-08-22 08:22:15-06	2025-09-09 15:04:46.180143-06	\N	1
c161eaa2-4689-48eb-ac75-efc5c81c5a24	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1NzQ1MTg4NiwiZXhwIjoxNzU3NDU1NDg2fQ.TzTTZGeY0IOU2DkD2yVxqadL6fGgPYbBBSn3djrkWyg	2025-09-09 16:04:46-06	\N	\N	f	2025-09-09 15:04:46-06	2025-09-10 13:29:26.949025-06	\N	1
ad91d362-2ebe-4b0a-9d2e-e8a92e5e28d6	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1NzUzMjU2NiwiZXhwIjoxNzU3NTM2MTY2fQ.UBdSlVaUTHrhNIECeC-MZJf6rJMnQcPU4GfoWK3s4CA	2025-09-10 14:29:26-06	\N	\N	f	2025-09-10 13:29:26-06	2025-09-11 07:52:44.577099-06	\N	1
3fb27956-679e-4418-a372-41eaac16e871	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1NzU5ODc2NCwiZXhwIjoxNzU3NjAyMzY0fQ.warrpGyKzeOLf0a27xmfE-ZulxTszvfyPOu579emUyA	2025-09-11 08:52:44-06	\N	\N	f	2025-09-11 07:52:44-06	2025-09-11 18:35:33.512998-06	\N	1
85e4de99-4af4-4645-bc0b-5466e8fce450	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1NzYzNzMzMywiZXhwIjoxNzU3NjQwOTMzfQ.MpVa44BEEa2IgLufVKwa7zdJxF4F-aFODc0MFoUw1fA	2025-09-11 19:35:33-06	\N	\N	f	2025-09-11 18:35:33-06	2025-09-12 16:24:20.535507-06	\N	1
5302b241-dbdb-4f00-a315-2f93b28725ab	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1NzcxNTg2MCwiZXhwIjoxNzU3NzE5NDYwfQ.LZhSJvMr1FEtsFguN_wMbyYxwhvwOpR9ZeMZWRSKBWs	2025-09-12 17:24:20-06	\N	\N	f	2025-09-12 16:24:20-06	2025-09-12 17:39:14.252726-06	\N	1
97c06cf8-2b27-48c3-b298-b13a6734812c	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1NzcyMDM1NCwiZXhwIjoxNzU3NzIzOTU0fQ.7yKe3Rc2vHC-dPtXAkwFWUuTrzKX5lSzaIXO5fPmyt8	2025-09-12 18:39:14-06	\N	\N	f	2025-09-12 17:39:14-06	2025-09-12 18:12:55.052879-06	\N	1
97fbd748-2706-47aa-b2e0-d283d84c5f94	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1NzcyMjM3NSwiZXhwIjoxNzU3NzI1OTc1fQ.T8f17vdr0lke8vbytZ1VnFuUUFkPCP-TieMKw3UXXEY	2025-09-12 19:12:55-06	\N	\N	f	2025-09-12 18:12:55-06	2025-09-12 18:13:11.889983-06	\N	1
2f627990-d5c2-4687-bddd-01b60e8d9adb	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1NzcyMjM5MSwiZXhwIjoxNzU3NzI1OTkxfQ.4bMs_jMJPW9uDCk2O-x3Tii9Tk4V3kaM2hL5rNexpMY	2025-09-12 19:13:11-06	\N	\N	f	2025-09-12 18:13:11-06	2025-09-12 18:48:35.577485-06	\N	1
1e95d8a0-f193-478b-94f3-3182200c900c	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1NzcyNDUxNSwiZXhwIjoxNzU3NzI4MTE1fQ.-EH_ye-wWaWjSTvzA_AV4WCyOK6yOkOfV93yfTgkCnE	2025-09-12 19:48:35-06	\N	\N	f	2025-09-12 18:48:35-06	2025-09-13 09:03:09.518996-06	\N	1
fb054725-1450-44c9-83f1-78fa60207f63	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1Nzc3NTc4OSwiZXhwIjoxNzU3Nzc5Mzg5fQ.aUDJzDEhu7KNy0ZY0SRPYEsh5FFoeADOH8RkNLFK3gE	2025-09-13 10:03:09-06	\N	\N	f	2025-09-13 09:03:09-06	2025-09-13 09:12:55.455941-06	\N	1
415941d4-7b0f-4d07-9138-d80ced5a3654	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1Nzc3NjM3NSwiZXhwIjoxNzU3Nzc5OTc1fQ.xgp9-3xW30nMAWaUiKgUi9gs2TuvA2w0iN9FiPQjWAA	2025-09-13 10:12:55-06	\N	\N	f	2025-09-13 09:12:55-06	2025-09-13 09:35:31.515183-06	\N	1
f0e521e0-9c55-4b83-9de6-cc74c8279aa6	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1Nzc3NzczMSwiZXhwIjoxNzU3NzgxMzMxfQ.GAfQ5a47VTfChbgIj4EDi242A8FueQFnjAIick4Qx4E	2025-09-13 10:35:31-06	\N	\N	f	2025-09-13 09:35:31-06	2025-09-13 10:00:03.928266-06	\N	1
1b449751-0610-43da-940b-260babf80b96	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1Nzc3OTIwMywiZXhwIjoxNzU3NzgyODAzfQ.2yiegPrkGH4fwRzJvdpx4ph5lpZtRnnOYxYzCW1ehuw	2025-09-13 11:00:03-06	\N	\N	f	2025-09-13 10:00:03-06	2025-09-13 10:11:23.378814-06	\N	1
5669a655-34bc-40a8-bbbd-362e84f5faa3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1Nzc3OTg4MywiZXhwIjoxNzU3NzgzNDgzfQ.01eSzMCUmoANe8uYFjIUXSSXPSlV-DxeVdVM8KG7w8I	2025-09-13 11:11:23-06	\N	\N	f	2025-09-13 10:11:23-06	2025-09-13 10:44:35.832922-06	\N	1
38598fe9-7e4d-4ec4-970b-52d8a5459b77	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1Nzc4MTg3NSwiZXhwIjoxNzU3Nzg1NDc1fQ.3ovJmyPg3SHOSkrKgC0EWqpRvy__qpbE1L1SE5gkuCs	2025-09-13 11:44:35-06	\N	\N	f	2025-09-13 10:44:35-06	2025-09-13 11:56:51.973619-06	\N	1
4707d9f7-ce1b-4bc6-aeb0-dd42316e9105	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1Nzc4NjIxMSwiZXhwIjoxNzU3Nzg5ODExfQ.whFd_udERWrJT27XsE0OSvOyQWTN-oQzsetdrj3OUxk	2025-09-13 12:56:51-06	\N	\N	f	2025-09-13 11:56:51-06	2025-09-13 12:13:46.305739-06	\N	1
6659164e-3911-4d91-8e7e-8ef2d5b3898d	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWQiOiIxIiwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWN0aXZlIjp0cnVlLCJjcmVhdGVBdCI6IjIwMjUtMDctMjdUMDQ6NDc6MzQuMDAwWiIsInVwZGF0ZUF0IjoiMjAyNS0wNy0yN1QwNDo0NzozNC42MjVaIiwiZGVsZXRlZEF0IjpudWxsfSwic3ViIjoiMSIsImlhdCI6MTc1Nzc4NzIyNiwiZXhwIjoxNzU3NzkwODI2fQ.Y1A9gFOXV8YTqZdsD2IZQ3s25k4BDlp5Pv-2f6x0mIY	2025-09-13 13:13:46-06	\N	\N	t	2025-09-13 12:13:46-06	2025-09-13 12:13:46.323293-06	\N	1
\.


--
-- TOC entry 4975 (class 0 OID 18454)
-- Dependencies: 230
-- Data for Name: mnt_usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mnt_usuarios (id, email, password, activo, created_at, updated_at, deleted_at, id_rol, two_factor_secret, is_2fa_enabled) FROM stdin;
1	admin@salud.gob.sv	$2b$10$oxFSrjBUqg6Cdmts9UTFkOPYRzk8EPcraO8BQDvtR1AO.Q6ZD7Tqm	t	2025-07-26 22:47:34-06	2025-09-13 10:48:06-06	\N	1	NFSEAMBKGBLUWMREJVNWKLDTPVDTQQ2GMEXEMKCYLVWSSZTUM5CA	t
\.


--
-- TOC entry 4983 (class 0 OID 0)
-- Dependencies: 220
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, true);


--
-- TOC entry 4801 (class 2606 OID 18464)
-- Name: mnt_tokens PK_1c5a962297ae4167f7e4c0f18b1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_tokens
    ADD CONSTRAINT "PK_1c5a962297ae4167f7e4c0f18b1" PRIMARY KEY (id);


--
-- TOC entry 4787 (class 2606 OID 18466)
-- Name: mnt_menu PK_2216fec43cb877e45b117688e1e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_menu
    ADD CONSTRAINT "PK_2216fec43cb877e45b117688e1e" PRIMARY KEY (id);


--
-- TOC entry 4793 (class 2606 OID 18468)
-- Name: mnt_permisos_roles PK_4525f9e5efb0533b87dcb993633; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_permisos_roles
    ADD CONSTRAINT "PK_4525f9e5efb0533b87dcb993633" PRIMARY KEY (id);


--
-- TOC entry 4795 (class 2606 OID 18470)
-- Name: mnt_permisos_usuarios PK_7451badbbc7254cefb59f1b5790; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_permisos_usuarios
    ADD CONSTRAINT "PK_7451badbbc7254cefb59f1b5790" PRIMARY KEY (id);


--
-- TOC entry 4783 (class 2606 OID 18472)
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- TOC entry 4789 (class 2606 OID 18474)
-- Name: mnt_modulos PK_8ca60ad3eda75b274f71b06c1db; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_modulos
    ADD CONSTRAINT "PK_8ca60ad3eda75b274f71b06c1db" PRIMARY KEY (id);


--
-- TOC entry 4785 (class 2606 OID 18476)
-- Name: mnt_etiquetas PK_94600f4b14c988568d154f2d001; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_etiquetas
    ADD CONSTRAINT "PK_94600f4b14c988568d154f2d001" PRIMARY KEY (id);


--
-- TOC entry 4781 (class 2606 OID 18478)
-- Name: bit_log_errores PK_c3830ca3a1e6514a575bd50f9ef; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bit_log_errores
    ADD CONSTRAINT "PK_c3830ca3a1e6514a575bd50f9ef" PRIMARY KEY (id);


--
-- TOC entry 4791 (class 2606 OID 18480)
-- Name: mnt_permisos_modulos PK_cfcbbffacbf44d5cd82eb33cf3d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_permisos_modulos
    ADD CONSTRAINT "PK_cfcbbffacbf44d5cd82eb33cf3d" PRIMARY KEY (id);


--
-- TOC entry 4797 (class 2606 OID 18482)
-- Name: mnt_restore_account PK_dab33f1a540accb6a6637c30d1a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_restore_account
    ADD CONSTRAINT "PK_dab33f1a540accb6a6637c30d1a" PRIMARY KEY (id);


--
-- TOC entry 4803 (class 2606 OID 18484)
-- Name: mnt_usuarios PK_f4c882b5bfef1cec732d8336f2a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_usuarios
    ADD CONSTRAINT "PK_f4c882b5bfef1cec732d8336f2a" PRIMARY KEY (id);


--
-- TOC entry 4799 (class 2606 OID 18486)
-- Name: mnt_rol_user PK_f952cfe5caa9d3fd0a71e61010c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_rol_user
    ADD CONSTRAINT "PK_f952cfe5caa9d3fd0a71e61010c" PRIMARY KEY (id);


--
-- TOC entry 4805 (class 2606 OID 18488)
-- Name: mnt_usuarios UQ_540dc996098cb83e8f478221371; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_usuarios
    ADD CONSTRAINT "UQ_540dc996098cb83e8f478221371" UNIQUE (email);


--
-- TOC entry 4815 (class 2606 OID 18489)
-- Name: mnt_restore_account FK_00833dd4d7063d17a176a3c6794; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_restore_account
    ADD CONSTRAINT "FK_00833dd4d7063d17a176a3c6794" FOREIGN KEY (id_user) REFERENCES public.mnt_usuarios(id);


--
-- TOC entry 4813 (class 2606 OID 18494)
-- Name: mnt_permisos_usuarios FK_1119f8998b2b24b667c94d8bc37; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_permisos_usuarios
    ADD CONSTRAINT "FK_1119f8998b2b24b667c94d8bc37" FOREIGN KEY (id_modulo) REFERENCES public.mnt_modulos(id);


--
-- TOC entry 4816 (class 2606 OID 18499)
-- Name: mnt_tokens FK_16ccb8b7566562f8f81cd337bdd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_tokens
    ADD CONSTRAINT "FK_16ccb8b7566562f8f81cd337bdd" FOREIGN KEY (id_user) REFERENCES public.mnt_usuarios(id);


--
-- TOC entry 4814 (class 2606 OID 18504)
-- Name: mnt_permisos_usuarios FK_20698b7eb95233b2641ca4e26cc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_permisos_usuarios
    ADD CONSTRAINT "FK_20698b7eb95233b2641ca4e26cc" FOREIGN KEY (id_usuario) REFERENCES public.mnt_usuarios(id);


--
-- TOC entry 4811 (class 2606 OID 18509)
-- Name: mnt_permisos_roles FK_2d07d41c7dca4d131b2d791f7a8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_permisos_roles
    ADD CONSTRAINT "FK_2d07d41c7dca4d131b2d791f7a8" FOREIGN KEY (id_modulo) REFERENCES public.mnt_modulos(id);


--
-- TOC entry 4809 (class 2606 OID 18514)
-- Name: mnt_permisos_modulos FK_3c5ce7ddbe24ed70d1fac64e45e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_permisos_modulos
    ADD CONSTRAINT "FK_3c5ce7ddbe24ed70d1fac64e45e" FOREIGN KEY (id_modulo_visa) REFERENCES public.mnt_modulos(id);


--
-- TOC entry 4806 (class 2606 OID 18519)
-- Name: mnt_menu FK_3e87762988f24690f81cca9af9d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_menu
    ADD CONSTRAINT "FK_3e87762988f24690f81cca9af9d" FOREIGN KEY (id_etiqueta) REFERENCES public.mnt_etiquetas(id);


--
-- TOC entry 4810 (class 2606 OID 18524)
-- Name: mnt_permisos_modulos FK_5cd0e9f6f62a0769e5db7cacf3f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_permisos_modulos
    ADD CONSTRAINT "FK_5cd0e9f6f62a0769e5db7cacf3f" FOREIGN KEY (id_modulo_endpoint) REFERENCES public.mnt_modulos(id);


--
-- TOC entry 4817 (class 2606 OID 18529)
-- Name: mnt_usuarios FK_7e2690925322b10866c6600b713; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_usuarios
    ADD CONSTRAINT "FK_7e2690925322b10866c6600b713" FOREIGN KEY (id_rol) REFERENCES public.mnt_rol_user(id);


--
-- TOC entry 4812 (class 2606 OID 18534)
-- Name: mnt_permisos_roles FK_c52dc82f9eb2a3c9b6f82baf89e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_permisos_roles
    ADD CONSTRAINT "FK_c52dc82f9eb2a3c9b6f82baf89e" FOREIGN KEY (id_rol) REFERENCES public.mnt_rol_user(id);


--
-- TOC entry 4807 (class 2606 OID 18539)
-- Name: mnt_modulos FK_cf8d10484b933f7c2317a931fe0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_modulos
    ADD CONSTRAINT "FK_cf8d10484b933f7c2317a931fe0" FOREIGN KEY (id_menu) REFERENCES public.mnt_menu(id);


--
-- TOC entry 4808 (class 2606 OID 18544)
-- Name: mnt_modulos FK_e033f260a289bf57ee6e94f40a4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mnt_modulos
    ADD CONSTRAINT "FK_e033f260a289bf57ee6e94f40a4" FOREIGN KEY (id_padre) REFERENCES public.mnt_modulos(id);


-- Completed on 2025-09-13 16:21:58

--
-- PostgreSQL database dump complete
--

