// Copyright 2013-2015, University of Colorado Boulder

/**
 * Node that shows the waving flag when the net force game is complete.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var inherit = require( 'PHET_CORE/inherit' );
  var blueWinsString = require( 'string!FORCES_AND_MOTION_BASICS/blueWins' );
  var redWinsString = require( 'string!FORCES_AND_MOTION_BASICS/redWins' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var AccessiblePeer = require( 'SCENERY/accessibility/AccessiblePeer' );
  var forcesAndMotionBasics = require( 'FORCES_AND_MOTION_BASICS/forcesAndMotionBasics' );

  // strings
  var leftSideWinsDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/leftSideWins.description' );
  var rightSideWinsDescriptionString = require( 'string!FORCES_AND_MOTION_BASICS/rightSideWins.description' );

  /**
   * Constructor for FlagNode
   *
   * @param {MotionModel} model the model for the entire 'motion', 'friction' or 'acceleration' screen
   * @param {number} centerX center for layout
   * @param {number} top top for layout
   * @param {Tandem} tandem
   * @constructor
   */
  function FlagNode( model, centerX, top, tandem ) {
    var self = this;
    this.model = model;
    Node.call( this, {
      tandem: tandem
    } );

    var textNode = new Text( model.cart.x < 0 ? blueWinsString : redWinsString, {
      tandem: tandem.createTandem( 'textNode' ),
      font: new PhetFont( 24 ),
      fill: 'white'
    } );
    this.path = new Path( null, {
      fill: model.cart.x < 0 ? 'blue' : 'red',
      stroke: 'black',
      lineWidth: 2,
      tandem: tandem.createTandem( 'pathNode' )
    } );
    this.addChild( this.path );

    //Shrink the text to fit on the flag if necessary
    if ( textNode.width > 220 ) {
      textNode.scale( 220 / textNode.width );
    }
    this.addChild( textNode );

    var update = this.updateFlagShape.bind( this );

    // listeners that will dispose the flag node when model is reset or cart is returned -
    // these must also be disposed
    var resetListener = function() { self.dispose(); };
    var cartReturnedListener = function() { self.dispose(); };
    model.on( 'reset-all', resetListener );
    model.on( 'cart-returned', cartReturnedListener );

    this.disposeFlagNode = function() {
      self.detach();
      model.timeProperty.unlink( update );
      textNode.dispose();
      self.path.dispose();
      model.off( 'reset-all', resetListener );
      model.off( 'cart-returned', cartReturnedListener );
    };

    //When the clock ticks, wave the flag
    model.timeProperty.link( update );
    textNode.centerX = this.path.centerX;
    textNode.centerY = this.path.centerY;
    this.centerX = centerX;
    this.top = top;

    // outfit with accessible content.  This dom element is essentially invisible but triggers the gameOverElement
    // inner text so that the user knows when the game is over and who won.
    // TODO: updating live element is entirely handled in the prototype function. This DOM element is not necessary!
    this.accessibleContent = {
      createPeer: function( accessibleInstance ) {

        // We want the dom element to look like:
        // <img tabIndex="-1 id='accessibleId' alt=flagWavingDescription >

        var domElement = document.createElement( 'div' );
        domElement.tabIndex = '-1'; // this element is should never receive focus

        return new AccessiblePeer( accessibleInstance, domElement );
      }
    };
  }

  forcesAndMotionBasics.register( 'FlagNode', FlagNode );

  return inherit( Node, FlagNode, {
    dispose: function() {
      Node.prototype.dispose.call( this );
      this.disposeFlagNode();
    },

    //Update the flag shape, copied from the Java version
    updateFlagShape: function() {
      var shape = new Shape();
      var maxX = 220;
      var maxY = 55;
      var dy = ( 7 * Math.sin( this.model.time * 6 ) );
      var dx = ( 2 * Math.sin( this.model.time * 5 ) ) + 10;
      shape.moveTo( 0, 0 );
      shape.cubicCurveTo( maxX / 3 + dx, 25 + dy, 2 * maxX / 3 + dx, -25 - dy, maxX + dx, dy / 2 );
      shape.lineTo( maxX + dx, maxY + dy / 2 );
      shape.cubicCurveTo( 2 * maxX / 3 + dx, -25 + maxY - dy, maxX / 3 + dx, 25 + maxY + dy, 0, maxY );
      shape.lineTo( 0, 0 );
      shape.close();
      this.path.shape = shape;
    },

    /**
     * Update the accessible game over element in the parallel DOM to notify the user that the game is over and that
     * a team has won the game of tug of war.
     *
     * @public (accessibility)
     */
    updateAccessibleGameOverElement: function() {

      // determine which string to use by determining which side won the game
      var gameOverDescriptionString = ( this.model.cart.x < 0 ) ? leftSideWinsDescriptionString : rightSideWinsDescriptionString;

      // get the live game over element from the DOM
      var gameOverElement = document.getElementById( 'netForceGameOverElement' );

      // update the description and fire the elements aria events ot notify user that the game is over
      gameOverElement.innerText = gameOverDescriptionString;

    }
  } );
} );