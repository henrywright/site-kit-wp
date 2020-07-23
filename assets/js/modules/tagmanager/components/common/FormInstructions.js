/**
 * Tag Manager Form Instructions component.
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
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Data from 'googlesitekit-data';
import { STORE_NAME as CORE_SITE } from '../../../../googlesitekit/datastore/site/constants';
import { STORE_NAME } from '../../datastore/constants';
import ExistingTagNotice from './ExistingTagNotice';
const { useSelect } = Data;

export default function FormInstructions() {
	const hasExistingTag = useSelect( ( select ) => select( STORE_NAME ).hasExistingTag() );
	const isSecondaryAMP = useSelect( ( select ) => select( CORE_SITE ).isSecondaryAMP() );

	if ( hasExistingTag ) {
		return <ExistingTagNotice />;
	}

	if ( isSecondaryAMP ) {
		return (
			<p>
				{ __( 'Looks like your site is using paired AMP. Please select your Tag Manager account and relevant containers below, the snippets will be inserted automatically on your site.', 'google-site-kit' ) }
			</p>
		);
	}

	return (
		<p>
			{ __( 'Please select your Tag Manager account and container below, the snippet will be inserted automatically on your site.', 'google-site-kit' ) }
		</p>
	);
}