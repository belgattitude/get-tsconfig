import AggregateError from 'aggregate-error';
import getTsconfig from '../src/index';

test('error: invalid json path', () => {
	expect(() => getTsconfig('.json')).toThrow('Cannot read file \'.json\'.');
});

test('error: invalid tsconfig.json', () => {
	try {
		getTsconfig('./tests/fixtures/tsconfig.invalid.json');
	} catch (error) {
		expect(error).toBeInstanceOf(AggregateError);

		if (error instanceof AggregateError) {
			const errorsArray = Array.from(error);
			expect(errorsArray[0].message).toBe('Compiler option \'strict\' requires a value of type boolean.');
			expect(errorsArray[1].message).toMatch('Argument for \'--jsx\' option must be: \'preserve\', \'react-native\', \'react\'');
		}
	}
});

test('get tsconfig from cwd', () => {
	const tsconfig = getTsconfig();

	expect(tsconfig.getRaw()).toMatchObject({
		compilerOptions: {
			moduleResolution: 'NodeJs',
			isolatedModules: true,
			esModuleInterop: true,
			declaration: true,
			strict: true,
		},
		include: ['src'],
	});
});

test('get tsconfig from directory path', () => {
	const tsconfig = getTsconfig('./tests/fixtures');

	expect(tsconfig.getRaw()).toMatchObject({
		compilerOptions: {
			strict: true,
			jsx: 'React',
			jsxFactory: 'h',
		},
	});
});

test('get tsconfig from tsconfig.json path', () => {
	const tsconfig = getTsconfig('./tests/fixtures/tsconfig.json');

	expect(tsconfig.getRaw()).toMatchObject({
		compilerOptions: {
			strict: true,
			jsx: 'React',
			jsxFactory: 'h',
		},
	});
});

test('get tsconfig from index.js path', () => {
	const tsconfig = getTsconfig('./tests/fixtures/index.js');

	expect(tsconfig.getRaw()).toMatchObject({
		compilerOptions: {
			strict: true,
			jsx: 'React',
			jsxFactory: 'h',
		},
	});
});

describe('no tsconfig', () => {
	test('get tsconfig', () => {
		const tsconfig = getTsconfig('/');

		expect(tsconfig.path).toBe(undefined);
		expect(tsconfig.parsed).toBe(undefined);
		expect(tsconfig.getRaw()).toStrictEqual({});
	});

	test('get tsconfig with defaults', () => {
		const tsconfig = getTsconfig('/');
	
		expect(tsconfig.path).toBe(undefined);
		expect(tsconfig.parsed).toBe(undefined);

		const rawConfigWithDefaults = tsconfig.getRaw(true);

		expect(
			rawConfigWithDefaults.compilerOptions!.typeRoots![0]
		).toMatch(/node_modules\/@types/);

		delete rawConfigWithDefaults.compilerOptions!.typeRoots;

		expect(rawConfigWithDefaults).toStrictEqual({
			"compilerOptions": {
				"allowSyntheticDefaultImports": false,
				"alwaysStrict": false,
				"declaration": undefined,
				"esModuleInterop": undefined,
				"generateCpuProfile": "profile.cpuprofile",
				"incremental": undefined,
				"jsxFactory": "React.createElement",
				"jsxImportSource": "react",
				"module": "CommonJS",
				"moduleResolution": "NodeJs",
				"noImplicitAny": false,
				"noImplicitThis": false,
				"preserveConstEnums": false,
				"reactNamespace": "React",
				"strictBindCallApply": false,
				"strictFunctionTypes": false,
				"strictNullChecks": false,
				"strictPropertyInitialization": false,
				"target": "ES3",
				"tsBuildInfoFile": ".tsbuildinfo",
				"types": [
					"babel__core",
					"babel__generator",
					"babel__template",
					"babel__traverse",
					"graceful-fs",
					"istanbul-lib-coverage",
					"istanbul-lib-report",
					"istanbul-reports",
					"jest",
					"json-schema",
					"json5",
					"mdast",
					"node",
					"normalize-package-data",
					"parse-json",
					"prettier",
					"stack-utils",
					"unist",
					"yargs",
					"yargs-parser",
				],
				"useDefineForClassFields": false,
				"useUnknownInCatchVariables": false,
			},
		});
	});
});
