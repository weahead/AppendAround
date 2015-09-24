# AppendAround

## A pattern for responsive markup

- [c]2012, @scottjehl, Filament Group, Inc. MIT/GPL

- [c]2015, We ahead AB. MIT/GPL

## how-to
	1. Insert potential element containers throughout the DOM
	2. give each container a data-set attribute with a value that matches all other containers' values
	3. Place your appendAround content in one of the potential containers
	4. Configure your CSS to only display one potential container at a time (and display others depending on @media conditions in your CSS)
	4. Call $.appendAround() when the DOM is ready, and it'll keep all appendAround content in a visibile container at all times


## Sample markup

	  <!-- potential container for appendAround -->
	  <div class="foo" data-set="foobarbaz"></div>

	  <ul>
	   <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
	   <li>Aliquam tincidunt mauris eu risus.</li>
	   <li>Vestibulum auctor dapibus neque.</li>
    </ul>

	  <!-- potential container for appendAround -->
	  <div class="bar" data-set="foobarbaz"></div>

	  <ul>
	   <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
	   <li>Aliquam tincidunt mauris eu risus.</li>
	   <li>Vestibulum auctor dapibus neque.</li>
	</ul>


	  <!-- initial container for appendAround -->
	  <div class="baz" data-set="foobarbaz">

	    <p class="sample">Sample appendAround Element</p>

	  </div>

## Sample CSS

   	/* the sample appendaround element */
	.sample {
		padding: 1em;
		background: tan;
	}

	.baz {
		display: block;
	}
	.foo,
	.bar {
		display: none;
	}

	@media (min-width: 30em){
		.bar {
		  display: block;
		}
		.foo, .baz {
		  display: none;
		}
	}

	@media (min-width: 50em){
		div.foo {
		  display: block;
		}
		div.bar, div.baz {
		  display: none;
		}
	}


## Sample JavaScript call

    $.appendAround();
