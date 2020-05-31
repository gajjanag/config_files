" plugins
call plug#begin('~/.local/share/nvim/plugged')
" syntax checking
Plug 'neomake/neomake'
" LaTeX support
Plug 'lervag/vimtex'
" Julia language support
Plug 'JuliaEditorSupport/julia-vim'
" color scheme
Plug 'junegunn/seoul256.vim'
call plug#end()

" syntax highlighting for sagemath
augroup filetypedetect
  au! BufRead,BufNewFile *.sage,*.spyx,*.pyx setfiletype python
augroup END

" Visual appearance: line numbers, 80 col highlight, matching parens, colors
set number
set colorcolumn=80
set showmatch
colo seoul256

" search stuff - smartcase + ability to turn off with space+space
set ignorecase
set smartcase
nmap <space><space> :noh<CR>/<BS>

" Indentation at multiples
set shiftround

" make wrapping the way I want: do not break in middle of word
" and highlight above 80 columns
set linebreak

" undo history
set undofile

" LaTeX
let g:vimtex_compiler_progname = 'nvr'
let g:vimtex_viewer_method='mupdf'
augroup WrapLineInTeXFile
    autocmd!
    autocmd FileType tex setlocal wrap
    autocmd FileType tex setlocal textwidth=78
    autocmd FileType tex setlocal fo+=t
    autocmd FileType tex setlocal fo-=l
augroup END

" ignore some stuff
set wildignore+=*/.hg/*,*/.svn/*,*/.git/*,*.pyc,*.so

    augroup executePermissions
        au!
        " adds execute permissions if file starts with appropriate shebang
        autocmd BufWritePost * call NoExtNewFile()
        function! NoExtNewFile()
            if getline(1) =~ "^#!.*/bin/"
                if &filetype == ""
                    filetype detect
                endif
                silent !chmod a+x <afile>
            endif
        endfunction
    augroup END

    augroup vimStuff
        au!
        " When editing a file, always jump to the last known cursor position.
        " Don't do it when the position is invalid or when inside an event handler
        " (happens when dropping a file on gvim).
        autocmd BufReadPost *
                    \ if line("'\"") > 0 && line("'\"") <= line("$") |
                    \   exe "normal! g`\"" |
                    \ endif

        autocmd bufwritepost .vimrc source $MYVIMRC
    augroup END

    " remove whitespace
    autocmd BufWritePre *.c,*.cpp,*.py,*.jl,*.m,*.tex,*.txt,*.vimrc :%s/\s\+$//e

    " template files
    autocmd BufNewFile *.tex 0r ~/.vim/templates/skeleton.tex

    " allow tabs in Makefile
    autocmd FileType make,automake set noexpandtab shiftwidth=8 softtabstop=8

    " project settings
    autocmd BufRead,BufNewFile ~/projects/ffmpeg/* setlocal cindent cinoptions=(0
    autocmd BufRead,BufNewFile ~/dev/webg/* setlocal cindent cinoptions=(0
    autocmd BufRead,BufNewFile ~/projects/linux/* setlocal noexpandtab tabstop=8 shiftwidth=8 textwidth=78

" Convenient command to see the difference between the current buffer and the
" file it was loaded from, thus the changes you made.
command! DiffOrig vert new | set bt=nofile | r # | 0d_ | diffthis | set fdl=99 | wincmd p | diffthis | set fdl=99

" \r := save the current file, chmod it +x, and run it
noremap \r :w<CR>:!chmod u+x %<CR>:!./%<CR>

" run make
map <buffer> \m :w<CR>:!make<CR>

" yank to end of line
nmap Y y$

" wrap when moving left or right
nnoremap j gj
nnoremap k gk
vnoremap j gj
vnoremap k gk
" and add virtual columns during visual block
set ve+=block

" Bindings for tabbed editing
noremap <C-l> :bnext<CR>
noremap <C-h> :bprev<CR>

" Two semicolons are easy to type.
:imap ;; <Esc>

" Bindings for windows
nnoremap <leader>h <c-w>h
nnoremap <leader>j <c-w>j
nnoremap <leader>k <c-w>k
nnoremap <leader>l <c-w>l

" Make tabs work how I like them: made of 4 spaces
set expandtab
set shiftwidth=4
set tabstop=4
set smarttab

set formatoptions=lc
set lbr

" correct my common typos
if (&encoding == "utf-8")
    set list
    set listchars=extends:»,tab:▸\ ,trail:›
    " eol:¬,
else
    set nolist
endif

" fold stuff
set fdo=hor,insert,search,undo,tag
set fillchars="fold:"

" sets w!! to sudo write, still does not work in neovim:
" https://github.com/neovim/neovim/issues/1716
"cmap w!! w !sudo tee % > /dev/null

" open definition in a new tab
map <C-\> :tab split<CR>:exec("tag ".expand("<cword>"))<CR>
" open definition in new veritcal split
map <A-]> :vsp <CR>:exec("tag ".expand("<cword>"))<CR>

set wildmode=longest,list,full
set wildmenu

" set completion to show a preview window
set cot=menu,preview,menuone

" easier jumping between errors and opening error list window
" map <leader>cc :botright cope<cr> " there seem to be errors with the
" quickfix window
map <leader>n :cn<cr>
map <leader>p :cp<cr>

" Bubble single lines with control-arrows
nmap <C-Up> [e
nmap <C-Down> ]e
" Bubble multiple lines
vmap <C-Up> [egv
vmap <C-Down> ]egv
" vmode indent/dedent preserves selections
vnoremap > >gv
vnoremap < <gv

" map tag commands to be nicer
nmap <C-[> <C-T>

" toggle nu and relnu with control-K
function! g:ToggleNuMode()
    if (&rnu == 1)
        set nornu
        set nu
    else
        set nonu
        set rnu
    endif
endfunc
nnoremap <C-K> :call g:ToggleNuMode()<cr>
vnoremap <C-K> :call g:ToggleNuMode()<cr>

" new, experimental, and in need of organization
set splitright
" this makes help appear on the bottom, which is annoying, but it also makes
" omnicomplete previews appear on the bottom, which i like
set splitbelow

" latex stuff
set grepprg=grep\ -nH\ $*

" nnoremap Z :w<CR>
nnoremap X :w<CR>

set confirm                 " Y-N-C prompt if closing with unsaved changes.
set report=0                " : commands always print changed line count.

syntax sync minlines=256


set lazyredraw
