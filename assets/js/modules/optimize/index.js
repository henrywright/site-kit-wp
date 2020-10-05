/**
 * Optimize module initialization.
 *
 * Site Kit by Google, Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import './datastore';
import Modules from 'googlesitekit-modules';
import { SetupMain as OptimizeSetup } from './components/setup';
import { SettingsMain as OptimizeSettings } from './components/settings';
import { fillFilterWithComponent } from '../../util';

/**
 * Add components to the settings page.
 */
addFilter(
	'googlesitekit.ModuleSettingsDetails-optimize',
	'googlesitekit.OptimizeModuleSettingsDetails',
	fillFilterWithComponent( OptimizeSettings )
);

domReady( () => {
	Modules.registerModule(
		'optimize',
		{
			setupComponent: OptimizeSetup,
		},
	);
} );
