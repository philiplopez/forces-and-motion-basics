// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'PHET_IO/assertions/assertInstanceOf' );
  var phetioNamespace = require( 'PHET_IO/phetioNamespace' );
  var phetioInherit = require( 'PHET_IO/phetioInherit' );
  var TObject = require( 'PHET_IO/types/TObject' );

  var TKnot = phetioInherit( TObject, 'TKnot', function( instance, phetioID ) {
    TObject.call( this, instance, phetioID );
    assert && assert( !!instance, 'instance should exist' );
    assertInstanceOf( instance, phet.forcesAndMotionBasics.Knot );
  }, {}, {

    fromStateObject: function( stateObject ) {
      if ( stateObject === 'null' ) {
        return null;
      }
      else {
        return phetio.getWrapper( stateObject ).instance;
      }
    },

    toStateObject: function( instance ) {
      if ( instance ) {
        assert && assert( instance.phetioID, 'id should exist' );
        return instance.phetioID;
      }
      else {
        return 'null';
      }
    }
  } );

  phetioNamespace.register( 'TKnot', TKnot );

  return TKnot;
} );

