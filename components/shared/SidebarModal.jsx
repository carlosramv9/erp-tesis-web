import React from 'react'

const SidebarModal = ({children, side, title, id}) => {
  return (
      <div class={side + " modal fade"} id={id} tabindex="-1" role="dialog" aria-labelledby={id + '0'}>
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 class="modal-title" id={id + '0'}>{title}</h4>
				</div>
				<div class="modal-body">
                      {children}
				</div>

			</div>
		</div>
	</div>
  )
}

export default SidebarModal